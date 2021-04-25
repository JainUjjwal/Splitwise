// const dbo = getDb();
const bcrypt = require("bcrypt");
const users = require("../model/UsersModel");
const utils = require("../../backend/lib/utils");
const mongoose = require("mongoose");
const saltRounds = 10;

const handle_request = async (msg, callback) => {
  console.log("this is msg")
  console.log(msg)
  let uploadPath = "";
  if (msg.files) {
    const image = msg.files.image;
    uploadPath = "/Splitwise/frontend/public/userImages/" + msg.body.username + ".jpg";
    image.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
  }
  bcrypt.hash(msg.body.password, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
    }
    const data = {
      username: msg.body.username,
      Fname: msg.body.Fname,
      phoneNumber: msg.body.phoneNumber,
      lang: "English",
      currency: "USD",
      password: hash,
      imgPath: uploadPath,
      timeZone: "PST",
    };
    await users.find({ username: msg.body.username }, async (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      if (result.length > 0) {
          callback(null, { err: "user already exists" })
        // res.status(203).send({ err: "user already exists" });
      } else {
        let newUser = new users(data);
        await newUser.save().then((result) => {
          const jwt = utils.issueJWT(result);
          const sendData = {
            userId: result._id,
            message: "Sign up successful",
            token: jwt.token,
            expiresIn: jwt.expires,
          }
          callback(null, sendData)
        });
      }
    });
  });
};

exports.handle_request = handle_request;