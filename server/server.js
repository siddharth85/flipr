const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const User = require('./models/User');
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
User.findById("60d708c653af56230c62adc6", function (err, details) {
   if (err) console.log(err);
   else {
     details.get("category.github").push( "shankanil007@gmail.com");
      
       details.get("category.github").push("gautamsiddharth8576@gmail.com");
       details.set("category.facebook", "shankanil007@gmail.com");
      
       details.get("category.facebook").push("gautamsiddharth8576@gmail.com");
       details.save();
     }
   });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
