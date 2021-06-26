const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");

router.get("/", async (req, res) => {
  const wb = await xlsx.readFile("../client/public/uploads/test.xlsx", {
    cellDates: true,
  });
  const ws = wb.Sheets["Sheet1"];

  const data = xlsx.utils.sheet_to_json(ws);

  const email = data.map(function (record) {
    return record;
  });
  res.json(email);
});

module.exports = router;
