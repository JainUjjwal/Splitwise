const db = require("../dbconnection");
const fs = require("fs");

const get_userInfo = (req, res) => {
  const username = req.query.username;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log(result);
        res.send(result);
      } else {
        res.status(252).send({ message: "User Info not found" });
      }
    }
  );
};

const post_userInfo = (req, res) => {
  const currentUser = req.body.userId;
  const username = req.body.username;
  const Fname = req.body.Fname;
  const phoneNumber = req.body.phoneNumber;
  const lang = req.body.lang;
  const currency = req.body.currency;
  const timezone = req.body.timezone;
  let uploadPath = "";
  if (req.files) {
    const image = req.files.image;
    uploadPath = "/var/www/html/userImages/" + username + ".jpg";
    fs.unlink(uploadPath, (err) => {
      console.log(err);
    });
    image.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
  }
  let valueArray = [
    username,
    Fname,
    phoneNumber,
    lang,
    timezone,
    currency,
    currentUser,
  ];
  let query =
    "UPDATE users SET username = ?, Fname = ?, phoneNumber = ?, lang = ?, timezone = ?, currency=? WHERE userId = ?";
  if (uploadPath.length > 2) {
    query =
      "UPDATE users SET username = ?, Fname = ?, phoneNumber = ?, lang = ?, timezone = ?, currency=?, imgPath = ? WHERE userId = ?";
    valueArray = [
      username,
      Fname,
      phoneNumber,
      lang,
      timezone,
      currency,
      uploadPath,
      currentUser,
    ];
  }
  db.query(query, valueArray, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).send({ message: "updated information recieved" });
    }
  });
};

module.exports = { get_userInfo, post_userInfo };
