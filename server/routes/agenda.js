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
  const { user_id, name, subject, body, sent_to, isRecurring } = job.attrs.data;

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
      to: "shankhanilborthakur@gmail.com",
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
  var {
    user_id,
    name,
    subject,
    body,
    sent_to,
    date,
    isRecurring,
    weekly,
    monthly,
    yearly,
    day,
  } = req.body;
  date = new Date(date);

  console.log(req.body);

  if (isRecurring === false) {
    try {
      (async function () {
        const job = agenda.create("SEND_MAIL", {
          user_id,
          name,
          subject,
          body,
          sent_to,
          isRecurring,
        });
        await agenda.start();
        await job.schedule(date).save();

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
        return res.status(200).json({ msg: "Success" });
      })();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  } else {
    if (weekly === true) {
      day = day.day;
      const hour = date.getHours();
      const min = date.getMinutes();
      // const st = `${min} ${hour} * * ${day}`;
      // console.log(typeof st);

      try {
        (async function () {
          const job = agenda.create("SEND_MAIL", {
            user_id,
            name,
            subject,
            body,
            sent_to,
            isRecurring,
          });
          await agenda.start();
          await job.repeatEvery(`${min} ${hour} * * ${day}`).save();

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

          // await agenda.every(`${min} ${hour} * * ${day}`, "SEND_MAIL", {
          //   user_id,
          //   name,
          //   subject,
          //   body,
          //   sent_to,
          //   isRecurring,
          // });
          return res.status(200).json({ msg: "Success" });
        })();
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }

    if (monthly === true) {
      const date_of_month = date.getDate();
      const hour = date.getHours();
      const min = date.getMinutes();
      // const st = `${min} ${hour} ${date_of_month} * *`;
      // console.log(st);

      try {
        (async function () {
          const job = agenda.create("SEND_MAIL", {
            user_id,
            name,
            subject,
            body,
            sent_to,
            isRecurring,
          });
          await agenda.start();
          await job.repeatEvery(`${min} ${hour} ${date_of_month} * *`).save();

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
          // await agenda.start();
          // await agenda.every(
          //   `${min} ${hour} ${date_of_month} * *`,
          //   "SEND_MAIL",
          //   {
          //     user_id,
          //     name,
          //     subject,
          //     body,
          //     sent_to,
          //     isRecurring,
          //   }
          // );
          return res.status(200).json({ msg: "Success" });
        })();
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }

    if (yearly === true) {
      const date_of_month = date.getDate();
      const month = date.getMonth();
      const hour = date.getHours();
      const min = date.getMinutes();
      // const st = `${min} ${hour} ${date_of_month} * *`;
      // console.log(st);

      try {
        (async function () {
          const job = agenda.create("SEND_MAIL", {
            user_id,
            name,
            subject,
            body,
            sent_to,
            isRecurring,
          });
          await agenda.start();
          await job
            .repeatEvery(`${min} ${hour} ${date_of_month} ${month} *`)
            .save();

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

          // await agenda.start();
          // await agenda.every(
          //   `${min} ${hour} ${date_of_month} ${month} *`,
          //   "SEND_MAIL",
          //   {
          //     user_id,
          //     name,
          //     subject,
          //     body,
          //     sent_to,
          //   }
          // );
          return res.status(200).json({ msg: "Success" });
        })();
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  }
});

module.exports = router;
