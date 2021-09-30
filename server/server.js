// Requirements 
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const User = require("./models/User");
const app = express();
const fileUpload = require("express-fileupload");
app.use(cors());
app.use(fileUpload());


connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/send_mail", require("./routes/agenda"));
app.use("/read_file", require("./routes/readFile"));
app.use("/user/contact", require("./routes/addContact"));
app.use("/api/sent", require("./routes/sent"));

app.post("/upload", (req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;

  file.mv(`${__dirname}/../client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filepath: `/uploads/${file.name}` });
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}



// ---------------------------------------- AGENDA Ends--------------------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
