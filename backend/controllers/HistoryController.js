const db = require("../dbconnection");
// const dbpool = require('../dbconnection');
const transactionList = (req, res) => {  
  const currentUser = req.body.userId
  // Database calls
  db.query(
    "SELECT users.Fname, transactionTable.transactionId, userTransaction.user1, userTransaction.user2, transactionTable.discription, userTransaction.amountPerPerson, groupTable.groupName, transactionTable.ts from transactionTable INNER JOIN userTransaction on userTransaction.transactionId = transactionTable.transactionId INNER JOIN groupTable on groupTable.groupId = transactionTable.groupId INNER JOIN users ON users.userId = userTransaction.user1 WHERE user1 = (?) OR user2 = (?) ORDER BY transactionTable.ts DESC;",
    [currentUser, currentUser],
    (err,result)=>{
      if(err){
        console.log(err);
      }else{
        let newStore = []
        // console.log(result);
        var uniqueTransactions = result.reduce((unique, o) => {
          if (!unique.some((obj) => obj.transactionId === o.transactionId)) {
            unique.push(o);
          }
          return unique;
        }, []);
        uniqueTransactions.forEach(element=>{
          let entry = {payer: element.user1!=currentUser?element.Fname:'You', payee:element.user2, discription:element.discription, amount: element.amountPerPerson, group:element.groupName, status: element.user1!=currentUser?false:true, timeStamp: element.ts};
          newStore.push(entry);
        })
        let groupList = [];
        newStore.forEach((element) => {
          if (!groupList.includes(element.group)) {
            groupList.push(element.group);
          }
        });
        res.status(200).send({ newStore, groupList });
        // console.log(newStore);
        console.log('sent transaction history');
      }
    }
  );
};

module.exports = { transactionList };
