const fs = require("fs");
const users = require("../model/UsersModel");
const kafka = require("../kafka/client");

const get_userInfo = async (req, res) => {
  kafka.make_request("profile", req.query, (err, result) => {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      if (result.message) {
        res.status(252).send(result);
      } else {
        res.status(200).send(result);
      }
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
