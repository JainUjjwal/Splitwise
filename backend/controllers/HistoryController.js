const db = require("../dbconnection");
const transactions = require("../model/TransactionModel");
const groups = require("../model/GroupModel");
// const dbpool = require('../dbconnection');

const testFunc = async (result, currentUser) => {
  let newStore = [];
  let groupList = [];
  for (let j = 0; j < result.length; j++) {
    if (!groupList.includes(result[j].groupName)) {
      groupList.push(result[j].groupName);
    }
    console.log("J: "+j)
    await transactions.find(
      { groupId: result[j]._id },
      (err, transactionResult) => {
        // EACH TRANSACTION BEING PUSHED GROUPWISE
        for (let i = 0; i < transactionResult.length; i++) {
          let entry = {
            payer:
              transactionResult[i].userId != currentUser
                ? transactionResult[i].Fname
                : "You",
            payee: "john doe",
            discription: transactionResult[i].discription,
            amount: transactionResult[i].amount,
            group: result[j].groupName,
            status: transactionResult[i].userId != currentUser ? false : true,
            timeStamp: transactionResult[i].createdAt,
          };
          newStore.push(entry);
        } 
      }
    );
  }
  console.log(newStore)
  return {newStore,groupList}
};

const transactionList = async (req, res) => {
  const currentUser = req.body.userId;
  let groupList = [];
  let newStore = [];
  groups.find({ "groupMembers.userId": currentUser }, async (err, result) => {
    // console.log("we have groups");
    // console.log(result);
    let sendData = await testFunc(result, currentUser);
    console.log("WE HAVE X");
    console.log(sendData);
    let newStore = sendData.newStore
    let groupList = sendData.groupList
    res.status(200).send({ newStore, groupList });
  });
  // Database calls
};

module.exports = { transactionList };
