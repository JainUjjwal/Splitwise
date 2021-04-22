
const kafka = require("../kafka/client");

const settle = (req, res) => {
  kafka.make_request("settle", req.body, (err, result) => {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      // console.log("Inside else");
      if (result.err) {
        res.status(401).send(result);
      } else {
        res.status(200).send(result);
      }
    }
  });
};

module.exports = { settle };
