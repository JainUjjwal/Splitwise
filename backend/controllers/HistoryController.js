const kafka = require("../kafka/client");

// const dbpool = require('../dbconnection');

const transactionList = async (req, res) => {
  console.log("check")
  console.log(req.body)
  kafka.make_request("history", req.body, (err, result) => {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      if (result.err) {
        res.status(252).send(result);
      } else {
        res.status(200).send(result);
      }
    }
  });
  // const currentUser = req.body.userId;
  // let groupList = [];
  // let newStore = [];
  // groups.find({ "groupMembers.userId": currentUser }, async (err, result) => {
  //   // console.log("we have groups");
  //   // console.log(result);
  //   let sendData = await testFunc(result, currentUser);
  //   console.log("WE HAVE X");
  //   console.log(sendData);
  //   let newStore = sendData.newStore
  //   let groupList = sendData.groupList
  //   res.status(200).send({ newStore, groupList });
  // });
  // Database calls
};

module.exports = { transactionList };
