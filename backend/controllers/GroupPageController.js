const db = require("../dbconnection");

const groupInfopost = (req, res) => {
  console.log(req.body);
  const memberList = [
    { name: "Ujjwal", amount: 1000, status: true },
    { name: "Pavan", amount: 500, status: false },
    { name: "Shubham", amount: 500, status: false },
  ];
  let dummyInfo = { groupName: "House", members: memberList };
  res.send({
    transactionList: [
      { discription: "Rent", amount: 2000, typeClass: true },
      { discription: "Trip", amount: 1000, typeClass: false },
      { discription: "Food", amount: 15, typeClass: true },
      { discription: "Drinks", amount: 15, typeClass: false },
    ],
    dummyInfo,
  });
};

const getGroupInfo = (req, res) => {
  console.log("checking");
  // db.query(
  //   "SELECT * from groupTable INNER JOIN userGroup ON groupTable.groupId = userGroup.groupId INNER JOIN users ON userGroup.userId = users.userId where groupTable.groupId = (?);",
  //   [req.body.groupID],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       if (result.length > 0) {
  //         let memberList2 = [];
  //         for (i=0;i<result.length;i++){
  //           memberList2.push({ name: result[i].Fname , amount: 1000, status: true },)
  //         }
  //         memberList = [
  //             { name: "Ujjwal", amount: 1000, status: true },
  //             { name: "Pavan", amount: 500, status: false },
  //             { name: "Shubham", amount: 500, status: false },
  //           ]
  //         let dummyInfo = { groupName: result[0].groupName, members: memberList2 };

  //         res.send({transactionList: [
  //           { discription: "Rent", amount: 2000, typeClass: true },
  //           { discription: "Trip", amount: 1000, typeClass: false },
  //           { discription: "Food", amount: 15, typeClass: true },
  //           { discription: "Drinks", amount: 15, typeClass: false },
  //         ],
  //         dummyInfo})

  //         console.log(dummyInfo)
  //       }
  //     }
  //   }
  // );

  // Getting transactions in the group
  currentUser = req.session.user.userId;
  db.query(
    "select transactionTable.transactionId, transactionTable.discription, transactionTable.amount, userTransaction.user1 from transactionTable right join userTransaction on transactionTable.transactionId = userTransaction.transactionId where groupId = (?) ORDER BY ts DESC;SELECT users.Fname, masterTable.balance, groupTable.groupName FROM masterTable inner join users on masterTable.user2 = users.userId inner join groupTable on groupTable.groupId = masterTable.groupId WHERE masterTable.groupId=(?) AND user1=(?);",
    [req.body.groupID,req.body.groupID,currentUser],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let newTransactionList = [];
        // Returns a list of all transactions in a group. so removing duplicate transactions.
        var uniqueTransactions = result[0].reduce((unique, o) => {
          if (!unique.some((obj) => obj.transactionId === o.transactionId)) {
            unique.push(o);
          }
          return unique;
        }, []);
        uniqueTransactions.forEach((element) => {
          if (element.user1 != currentUser) {
            let transaction = {
              discription: element.discription,
              amount: element.amount,
              typeClass: false,
            };
            newTransactionList.push(transaction);
          } else {
            let transaction = {
              discription: element.discription,
              amount: element.amount,
              typeClass: true,
            };
            newTransactionList.push(transaction);
          }
        });
        // Setting List of Members in the group and their balance with respect to Current User.
        const memberList = [
          { name: "Ujjwal", amount: 1000, status: true },
          { name: "Pavan", amount: 500, status: false },
          { name: "Shubham", amount: 500, status: false },
        ];
        let newMemberList = []
        result[1].forEach(element=>{
          if(element.balance>0){
            let member = {name:element.Fname, amount:element.balance, status:true} 
            newMemberList.push(member)
          }else{
            let member = {name:element.Fname, amount:0-element.balance, status:false} 
            newMemberList.push(member)
          }
        })
        console.log(result[1]);
        let dummyInfo = { groupName: result[1][0].groupName, members: newMemberList };
        res.send({
          transactionList: newTransactionList,
          dummyInfo,
        });
      }
    }
  );
  
};

module.exports = { groupInfopost, getGroupInfo };
