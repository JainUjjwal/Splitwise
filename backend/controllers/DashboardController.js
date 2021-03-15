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
  const username = req.query.username;
  db.query(
    "SELECT * FROM users WHERE username != ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send({userList: result, dataBlock: dataBlock})
      } else {
        res
          .status(252)
          .send({ message: "User Info not found" });
      }
    }
  );
}
module.exports = {userInfopost, getUserList};