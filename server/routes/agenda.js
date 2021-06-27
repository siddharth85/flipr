const Agenda = require("agenda");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Content = require("../models/Content");
var nodemailer = require("nodemailer");
const { database } = require("agenda/dist/agenda/database");

const agenda = new Agenda({
  db: {
    address:
      "mongodb+srv://shankhanil007:1234@cluster0.azmz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    collection: "jobs",
  },
  processEvery: "20 seconds",
});

agenda.define("SEND_MAIL", (job, done) => {
  const { user_id, name, subject, body, sent_to } = job.attrs.data;

  User.findById(user_id, function (err, details) {
    if (err) console.log(err);
    else {
      const check = details.job_id.includes(job.attrs._id);

      if (check) {
      } else {
        details.job_id.push(job.attrs._id);
        details.save();
        Content.create(
          new Content({
            job_id: job.attrs._id,
            name: name,
            subject: subject,
            body: body,
            sent_to: sent_to,
          })
        );
      }
    }
  });

  User.findById(user_id, function (err, details) {
    if (err) {
      console.log(err);
    }

    var mailList = [];
    details.get(`category.${sent_to}`).forEach((info) => {
      mailList.push(info.Email);
    });

    var smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "tatusharma321@gmail.com",
        pass: "malowali",
      },
    });

    var mailOptions = {
      to: "gautamsiddharth8576@gmail.com",
      // bcc: [mailList],
      from: "tatusharma321@gmail.com",
      subject: subject,
      text: body,
    };
    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
        req.flash(
          "error",
          "We seem to be experiencing issues. Please try again later."
        );
        res.redirect("/");
      }
      console.log("mail sent to " + mailList);
    });
  });

  console.log("Email sent successfully");

  done();
});

router.post("/", async (req, res) => {
  let { user_id, name, subject, body, sent_to, date, isRecurring } = req.body;

  if (isRecurring === false) {
    try {
      (async function () {
        await agenda.start();
        await agenda.schedule(date, "SEND_MAIL", {
          user_id,
          name,
          subject,
          body,
          sent_to,
        });
        return res.status(200).json({ msg: "Success" });
      })();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
});

module.exports = router;
