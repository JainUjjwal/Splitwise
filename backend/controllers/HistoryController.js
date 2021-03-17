const db = require("../dbconnection");

const transactionList = (req, res) => {
  const store = [
    {
      payer: "user 1",
      payee: "user 2",
      discription: "fruits",
      amount: 20,
      group: "Trip",
      status: true,
    },
    {
      payer: "user 3",
      payee: "user 4",
      discription: "eggs",
      amount: 3,
      group: "House",
      status: false,
    },
    {
      payer: "user 1",
      payee: "user 4",
      discription: "Settle Up",
      amount: 25,
      group: "xyz",
      status: true,
    },
    {
      payer: "user 2",
      payee: "user 1",
      discription: "cheese",
      amount: 6,
      group: "House",
      status: false,
    },
    {
      payer: "user X",
      payee: "user Y",
      discription: "new Controller based transaction from backend",
      amount: 10,
      group: "Backend",
      status: false,
    },
  ];

  
  // Getting rid of duplicated group names.

  // store.forEach((element) => {
  //   if (!groupList.includes(element.group)) {
  //     groupList.push(element.group);
  //   }
  // });
  
  const currentUser = req.session.user.userId
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
        res.send({ newStore, groupList });
        // console.log(newStore);
        console.log('sent transaction history');
      }
    }
  );
};

module.exports = { transactionList };
