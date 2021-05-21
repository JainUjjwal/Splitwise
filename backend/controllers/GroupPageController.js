const db = require("../dbconnection");
const groups = require("../model/GroupModel");
const users = require("../model/UsersModel");
const userRelation = require("../model/UserRelationModel");
const transactions = require("../model/TransactionModel");

const getUserNames = async (balanceData) => {
  
  let newMemberList1 = [];
  for (let i = 0; i < balanceData.length; i++) {
    await users.find({ _id: balanceData[i].user2 }, (err, names) => {
      //creating member list to send to frontend
      console.log(names);
      newMemberList1.push({
        name: names[0].Fname,
        amount:
          balanceData[i].balance >= 0
            ? balanceData[i].balance
            : 0 - balanceData[i].balance,
        status: balanceData[i].balance >= 0 ? true : false,
      });
    })
  }
  return newMemberList1
};

const getTransactionInfo = async (groupId, currentUser) => {
  return await transactions.find({ groupId: groupId }).then((trans) => {
    let newTransactionList = [];
    trans.forEach((element) => {
      if (element.userId == currentUser) {
        let transaction = {
          id: element._id,
          discription: element.discription,
          amount: element.amount,
          typeClass: true,
          Fname: element.Fname,
          ts: element.createdAt,
          comments: element.comments.length > 0 ? element.comments : false,
        };
        newTransactionList.push(transaction);
      } else {
        let transaction = {
          id: element._id,
          discription: element.discription,
          amount: element.amount,
          typeClass: false,
          Fname: element.Fname,
          ts: element.createdAt,
          comments: element.comments.length > 0 ? element.comments : false,
        };
        newTransactionList.push(transaction);
      }
    });
    return newTransactionList;
  });
};

const getGroupInfo = async (req, res) => {
  const sendResponse = (dummyInfo, newTransactionList) => {
    res.json({
      transactionList: newTransactionList,
      dummyInfo,
    });
  };
  // Getting transactions in the group
  const currentUser = req.body.userId;
  const groupId = req.body.groupID;
  await groups.findOne({ _id: groupId }, async (err, result) => {
    if (err) {
      console.log(err);
    }
    await userRelation.find(
      { groupId: groupId, user1: currentUser },
      async (err, balanceData) => {
        // let newMemberList1 =[];
        if (err) {
          console.log(err);
        }
        const newTransactionList = await getTransactionInfo(
          groupId,
          currentUser
        );
        //getting users names
        let mongoMemberList = await getUserNames(balanceData);
        console.log(mongoMemberList)
        let dummyInfo = {
          groupName: result.groupName,
          members: mongoMemberList,
        };
        sendResponse(dummyInfo, newTransactionList.reverse());
      }
    );
  });
};

const updateGroupInfo = async (req, res) => {
  await groups.findOneAndUpdate(
    { _id: req.body.groupId },
    { groupName: req.body.groupName },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(201).json({ message: "Edit Saved" });
    }
  );
};

module.exports = { getGroupInfo, updateGroupInfo };
