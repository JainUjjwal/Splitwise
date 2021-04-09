const fs = require("fs");
const users = require("../model/UsersModel");

const get_userInfo = async (req, res) => {
  const userId = req.query.userId;
  await users.findById(userId, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result) {
      console.log(result);
      res.status(200).send(result);
    } else {
      res.status(252).send({ message: "User Info not found" });
    }
  });
};

const post_userInfo = async (req, res) => {
  let uploadPath = "";
  if (req.files) {
    const image = req.files.image;
    uploadPath = "/var/www/html/userImages/" + req.body.username + ".jpg";
    fs.unlink(uploadPath, (err) => {
      console.log(err);
    });
    image.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
  }

  let data = {
    username: req.body.username,
    Fname: req.body.Fname,
    phoneNumber: req.body.phoneNumber,
    lang: req.body.lang,
    timeZone: req.body.timezone,
    currency: req.body.currency
  };
  if (uploadPath.length > 2) {
    data = {
      username: req.body.username,
      Fname: req.body.Fname,
      phoneNumber: req.body.phoneNumber,
      lang: req.body.lang,
      timeZone: req.body.timezone,
      currency: req.body.currency,
      imgPath: uploadPath
    };
  }

  await users.findByIdAndUpdate(req.body.userId, data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).send({ message: "updated information recieved" });
    }
  });
};

module.exports = { get_userInfo, post_userInfo };
