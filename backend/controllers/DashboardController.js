const db = require("../dbconnection");
const users = require("../model/UsersModel");
const userRelation = require("../model/UserRelationModel");
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

const getUserList = async (req, res) => {
  const currentUser = req.query.userId;
  let userList;
  let newDataBlock = {};
  await users.find({ _id: { $ne: req.query.userId } }, (err, result) => {
    // console.log(result)
    userList = result;
  });
  await userRelation.find({ user1: req.query.userId }, async (err, result) => {
    for (let i = 0; i < result.length; i++) {
      if (result[i].user2 in newDataBlock) {
        let updatedBalance =
          newDataBlock[result[i].user2].amount + result[i].balance;
        newDataBlock[result[i].user2].amount = updatedBalance;
        if (updatedBalance >= 0) {
          newDataBlock[result[i].user2].typeClass = true;
        } else {
          newDataBlock[result[i].user2].typeClass = false;
        }
      } else {
        let userinfo = await users.findOne({_id:result[i].user2}).exec()
        console.log()
        newDataBlock[result[i].user2] = {
          id: result[i].user2,
          Fname: userinfo.Fname,
          amount: result[i].balance,
          typeClass: result[i].balance >= 0 ? true : false,
        };
      }
    }
    // console.log(newDataBlock);
    await res.send({ userList: userList, dataBlock: newDataBlock });
  });

  // db.query(
  //   "SELECT * FROM users WHERE userId != ?; SELECT user2, balance, Fname FROM masterTable AS a INNER JOIN users AS b on a.user2 = b.userId where user1 = ?",
  //   [currentUser, currentUser],
  //   (err, result) => {
  //     if (err) {
  //       res.send({ err: err });
  //     }
  //     if (result[0].length > 0) {
  //       let newDataBlock = {};
  //       if(result[1].length>0){
  //       result[1].forEach((element) => {
  //         if (element.user2 in newDataBlock) {
  //           let updatedBalance =
  //             newDataBlock[element.user2].amount + element.balance;
  //           newDataBlock[element.user2].amount = updatedBalance;
  //         } else {
  //           newDataBlock[element.user2] = {
  //             Fname: element.Fname,
  //             amount: element.balance,
  //             typeClass: element.balance >= 0 ? true : false,
  //           };
  //         }
  //       });
  //     }
  //       res.send({ userList: result[0], dataBlock: newDataBlock});
  //     } else {
  //       res.status(252).send({ message: "User Info not found" });
  //     }
  //   }
  // );
};

// [
//   { user2: "2", Fname: "", balance: 2.333 },
//   { user2: "2", Fname: "", balance: 4 },
//   { user2: "3", Fname: "", balance: -5.33 },
// ]

module.exports = { userInfopost, getUserList };
