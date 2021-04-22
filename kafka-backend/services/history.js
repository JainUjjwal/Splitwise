const users = require("../model/UsersModel");

const transactions = require("../model/TransactionModel");
const groups = require("../model/GroupModel");

const testFunc = async (result, currentUser) => {
  let newStore = [];
  let groupList = [];
  for (let j = 0; j < result.length; j++) {
    if (!groupList.includes(result[j].groupName)) {
      groupList.push(result[j].groupName);
    }
    console.log("J: " + j);
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
  console.log(newStore);
  return { newStore, groupList };
};

const handle_request = async (msg, callback) => {
  const currentUser = msg.userId;
  groups.find({ "groupMembers.userId": currentUser }, async (err, result) => {
    if(err){
        callback(null, {err:err})
    }
    let sendData = await testFunc(result, currentUser);
    let newStore = sendData.newStore;
    let groupList = sendData.groupList;
    callback(null, { newStore, groupList })
    // res.status(200).send({ newStore, groupList });
  });
};

exports.handle_request = handle_request;
