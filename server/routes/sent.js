const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Job = require("../models/Job");

router.get("/", async (req, res) => {
  let sentmails = [];

  let recurringmails = [];

  let scheduledmails = [];
  try {
    function doA() {
      return new Promise((resolve) => {
        var arr = {};
        User.findById("60d88fbfdce43922acbb72ef", function (err, details) {
          if (err) console.log(err);
          else {
            const job_id = details.job_id;

            job_id.forEach((id) => {
              Job.findById(id, async function (err, x) {
                if (err) console.log(err);
                else {
                  var info = JSON.stringify(x);
                  info = info.replace("_id", "id");
                  info = JSON.parse(info);
                  //   console.log(x.data);
                  //   res.json(obj.data);
                  if (info.data.isRecurring === true) {
                    const obj = { data: info.data, time: info.nextRunAt };
                    recurringmails.push(obj);
                  } else {
                    if (info.nextRunAt) {
                      const obj = { data: info.data, time: info.nextRunAt };
                      scheduledmails.push(obj);
                    } else {
                      const obj = { data: info.data, time: info.lastRunAt };
                      sentmails.push(obj);
                    }
                  }
                }
              });
            });
          }
        });

        setTimeout(() => {
          resolve(arr);
        }, 3000);
      });

      // console.log("hello");
    }

    async function main() {
      const result = await doA();
      // console.log(result);
      const data = {
        sent: sentmails,
        scheduled: scheduledmails,
        recurring: recurringmails,
      };
      res.json(data);
    }

    main();

    // function doA() {
    //     return new Promise((resolve) => {
    //   User.findById("60d752260b0a3453bcf18d22", function (err, details) {
    //     if (err) console.log(err);
    //     else {
    //       const job_id = details.job_id;

    //       job_id.forEach((id) => {
    //         Job.findById(id, async function (err, x) {
    //           if (err) console.log(err);
    //           else {
    //             var info = JSON.stringify(x);
    //             info = info.replace("_id", "id");
    //             info = JSON.parse(info);
    //             //   console.log(x.data);
    //             //   res.json(obj.data);
    //             if (info.data.isRecurring) {
    //               const obj = { data: info.data, time: info.nextRunAt };
    //               recurringmails.push(obj);
    //             } else {
    //               if (info.nextRunAt) {
    //                 const obj = { data: info.data, time: info.nextRunAt };
    //                 scheduledmails.push(obj);
    //               } else {
    //                 const obj = { data: info.data, time: info.lastRunAt };
    //                 sentmails.push(obj);
    //               }
    //             }
    //           }
    //         });
    //       });
    //     }
    //   });
    // }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
