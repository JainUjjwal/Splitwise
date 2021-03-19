const db = require("../dbconnection");

const getGroupInfo = (req, res) => {
  // console.log("checking");
  // Getting transactions in the group
  currentUser = req.body.userId;
  db.query(
    "select transactionTable.transactionId, transactionTable.discription, transactionTable.amount, userTransaction.user1, users.Fname, ts from transactionTable right join userTransaction on transactionTable.transactionId = userTransaction.transactionId inner join users on users.userId = userTransaction.user1 where groupId = ? ORDER BY ts DESC;SELECT users.Fname, masterTable.balance, groupTable.groupName FROM masterTable inner join users on masterTable.user2 = users.userId inner join groupTable on groupTable.groupId = masterTable.groupId WHERE masterTable.groupId=(?) AND user1=(?);",
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
              Fname: element.Fname,
              ts: element.ts
            };
            newTransactionList.push(transaction);
          } else {
            let transaction = {
              discription: element.discription,
              amount: element.amount,
              typeClass: true,
              Fname: "You",
              ts: element.ts
            };
            newTransactionList.push(transaction);
          }
        });
        // Setting List of Members in the group and their balance with respect to Current User.
        let newMemberList = []
        result[1].forEach(element=>{
          if(element.balance>=0){
            let member = {name:element.Fname, amount:element.balance, status:true} 
            newMemberList.push(member)
          }else{
            let member = {name:element.Fname, amount:0-element.balance, status:false} 
            newMemberList.push(member)
          }
        })
        // console.log(result[1]);
        let dummyInfo = { groupName: result[1][0].groupName, members: newMemberList };
        // let dummyInfo = { groupName: 'dummy', members: newMemberList };
        res.json({
          transactionList: newTransactionList,
          dummyInfo,
        });
      }
    }
  );
  
};

const updateGroupInfo = (req, res) =>{
  // console.log(req.body);
  const query = "UPDATE groupTable SET groupName = ? WHERE groupId = ?"
  db.query(query, [req.body.groupName, req.body.groupId], (err, result)=>{
    if(err){
      console.log(err);
      return;
    }else{
      res.status(201).json({message:'Edit Saved'});
      return;
    }
  })
}

module.exports = { getGroupInfo , updateGroupInfo};
