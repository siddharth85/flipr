const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const User = require("./models/User");
const app = express();
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// ----------------------------------------------------------------------------------------------------------
// User.findById("60d708c653af56230c62adc6", function (err, details) {
//   if (err) console.log(err);
//   else {
//     details.get("category.github").push("shankanil007@gmail.com");

//     details.get("category.github").push("gautamsiddharth8576@gmail.com");
//     details.set("category.facebook", "shankanil007@gmail.com");

//     details.get("category.facebook").push("gautamsiddharth8576@gmail.com");
//     details.save();
//   }
// });
// ----------------------------------------------------------------------------------------------------------

// ---------------------------------------- AGENDA --------------------------------------------------------------

const Agenda = require("agenda");
const x = require("./models/Agenda");

const agenda = new Agenda({
  db: {
    address:
      "mongodb+srv://shankhanil007:1234@cluster0.azmz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    collection: "agendas",
  },
  processEvery: "20 seconds",
});

agenda.define("JOB_ONE", (job, done) => {
  console.log("job one fired here");
  done();
});

agenda.define("JOB_TWO", (job, done) => {
  console.log("JOB TWO fired here");
  done();
});

agenda.define("JOB_THREE", (job, done) => {
  console.log(job.attrs._id);
  console.log("JOB three fired here");
  done();
});

agenda.define("JOB_FOUR", (job, done) => {
  console.log("JOB FOUR fired");
  done();
});

(async function () {
  await agenda.start();

  // await agenda.schedule("2 seconds", "JOB_ONE");
  // await agenda.schedule("4 seconds", "JOB_TWO");
  await agenda.every("6 seconds", "JOB_THREE");
  // await agenda.schedule("in 1 minute", "JOB_FOUR");
})();

// x.find({}, function (err, details) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(details);
//   }
// });

// var dateUTC = new Date("2021-06-26T13:41:53.085+00:00");
// var dateUTC = dateUTC.getTime();
// var dateIST = new Date(dateUTC);
// //date shifting for IST timezone (+5 hours and 30 minutes)
// dateIST.setHours(dateIST.getHours() + 5);
// dateIST.setMinutes(dateIST.getMinutes() + 30);

// console.log(dateIST);

// ---------------------------------------- AGENDA Ends--------------------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
