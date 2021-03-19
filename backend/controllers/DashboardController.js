const db = require("../dbconnection");

var dataBlock = [
  { id: "1", Fname: "Ujjwal", amount: 2000, typeClass: true },
  { id: "2", Fname: "Mohit", amount: 1000, typeClass: false },
  { id: "3", Fname: "Shashwat", amount: 15, typeClass: true },
  { id: "4", Fname: "Ankit", amount: 30, typeClass: false },
];

const userInfopost = (req, res) => {
  // console.log(req.session.user);
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

const getUserList = (req, res) => {
  const currentUser = req.query.userId;
  const username = req.query.username;
  db.query(
    "SELECT * FROM users WHERE username != ?; SELECT user2, balance, Fname FROM masterTable AS a INNER JOIN users AS b on a.user2 = b.userId where user1 = ?",
    [username, currentUser],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result[0].length > 0) {
        let newDataBlock = {};
        if(result[1].length>0){
        result[1].forEach((element) => {
          if (element.user2 in newDataBlock) {
            let updatedBalance =
              newDataBlock[element.user2].amount + element.balance;
            newDataBlock[element.user2].amount = updatedBalance;
          } else {
            newDataBlock[element.user2] = {
              Fname: element.Fname,
              amount: element.balance,
              typeClass: element.balance >= 0 ? true : false,
            };
          }
        });
      }
        res.send({ userList: result[0], dataBlock: newDataBlock});
      } else {
        res.status(252).send({ message: "User Info not found" });
      }
    }
  );
};

// [
//   { user2: "2", Fname: "", balance: 2.333 },
//   { user2: "2", Fname: "", balance: 4 },
//   { user2: "3", Fname: "", balance: -5.33 },
// ]

module.exports = { userInfopost, getUserList };
