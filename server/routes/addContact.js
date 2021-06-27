const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    User.findById("60d872c9493abe3098fb8f25", function (err, details) {
      if (err) console.log(err);
      else {
        const type = req.body.category;
        const contacts = req.body.contacts;
        const check = details.get(`category.${type}`);

        if (check === undefined) {
          details.set(`category.${type}`, contacts);
          details.save();
        } else {
          contacts.forEach((data) => {
            details.get(`category.${type}`).push(data);
          });

          details.save();
        }
      }
    });
  } catch (err) {}
});

module.exports = router;
