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
      newMemberList1.push({
        name: names[0].Fname,
        amount: balanceData[i].balance,
        status: balanceData[i].balance >= 0 ? true : false,
      });
    });
  }
  return newMemberList1;
};
const getName = async (id) => {
  await users.findOne({ _id: id }).then();
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
          comments: element.comments.length>0?element.comments:false
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
          comments: element.comments.length>0?element.comments:false
        };
        newTransactionList.push(transaction);
      }
    });
    return newTransactionList;
  });
};
const getGroupInfo = async (req, res) => {
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
        // console.log(newTransactionList)
        //getting users names
        let test2 = await getUserNames(balanceData);
        // console.log(test2)
        let dummyInfo = { groupName: result.groupName, members: test2 };
        // callbackToSend(test2, result)
        sendResponse(dummyInfo, newTransactionList);
      }
    );
  });
  const sendResponse = (dummyInfo, newTransactionList) => {
    res.json({
      transactionList: newTransactionList,
      dummyInfo,
    });
  };
  // db.query(
  //   "select transactionTable.transactionId, transactionTable.discription, transactionTable.amount, userTransaction.user1, users.Fname, ts from transactionTable right join userTransaction on transactionTable.transactionId = userTransaction.transactionId inner join users on users.userId = userTransaction.user1 where groupId = ? ORDER BY ts DESC;SELECT users.Fname, masterTable.balance, groupTable.groupName FROM masterTable inner join users on masterTable.user2 = users.userId inner join groupTable on groupTable.groupId = masterTable.groupId WHERE masterTable.groupId=(?) AND user1=(?); SELECT groupName from groupTable where groupId = ?;",
  //   [req.body.groupID,req.body.groupID,currentUser, req.body.groupID],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       let newTransactionList = [];
  //       // Returns a list of all transactions in a group. so removing duplicate transactions.
  //       var uniqueTransactions = result[0].reduce((unique, o) => {
  //         if (!unique.some((obj) => obj.transactionId === o.transactionId)) {
  //           unique.push(o);
  //         }
  //         return unique;
  //       }, []);
  //       uniqueTransactions.forEach((element) => {
  //         if (element.user1 != currentUser) {
  //           let transaction = {
  //             discription: element.discription,
  //             amount: element.amount,
  //             typeClass: false,
  //             Fname: element.Fname,
  //             ts: element.ts
  //           };
  //           newTransactionList.push(transaction);
  //         } else {
  //           let transaction = {
  //             discription: element.discription,
  //             amount: element.amount,
  //             typeClass: true,
  //             Fname: "You",
  //             ts: element.ts
  //           };
  //           newTransactionList.push(transaction);
  //         }
  //       });
  //       // Setting List of Members in the group and their balance with respect to Current User.
  //       let newMemberList = []
  //       result[1].forEach(element=>{
  //         if(element.balance>=0){
  //           let member = {name:element.Fname, amount:element.balance, status:true}
  //           newMemberList.push(member)
  //         }else{
  //           let member = {name:element.Fname, amount:0-element.balance, status:false}
  //           newMemberList.push(member)
  //         }
  //       })
  //       console.log(result[2][0].groupName);
  //       let dummyInfo = { groupName: result[2][0]? result[2][0].groupName : result[1][0].groupName, members: newMemberList };
  //       res.json({
  //         transactionList: newTransactionList,
  //         dummyInfo,
  //       });
  //     }
  //   }
  // );
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
