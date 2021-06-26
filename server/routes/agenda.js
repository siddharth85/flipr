const Agenda = require("agenda");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Content = require("../models/Content");

const agenda = new Agenda({
  db: {
    address:
      "mongodb+srv://shankhanil007:1234@cluster0.azmz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    collection: "jobs",
  },
  processEvery: "20 seconds",
});

agenda.define("SEND_MAIL", (job, done) => {
  const { user_id, subject, body, sent_to } = job.attrs.data;

  Content.create(
    new Content({
      job_id: job.attrs._id,
      subject: subject,
      body: body,
      sent_to: sent_to,
    })
  );

  User.findById(user_id, function (err, details) {
    if (err) console.log(err);
    else {
      details.job_id.push(job.attrs._id);
      details.save();
    }
  });

  console.log("Email sent successfully");

  done();
});

router.post("/", async (req, res) => {
  let { user_id, subject, body, sent_to } = req.body;

  try {
    (async function () {
      await agenda.start();
      await agenda.schedule("6 seconds", "SEND_MAIL", {
        user_id,
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
});

module.exports = router;
