const bcrypt = require("bcrypt");
const users = require("../model/UsersModel");
const utils = require("../../backend/lib/utils");


const handle_request = async (msg, callback) => {
  console.log("this is msg");
  const username = msg.username;
  const password = msg.password;
  console.log(username);
  await users
    .find({ username: username }, (err, result) => {
      console.log("in find");
      console.log(result);
      if (result.length>0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            console.log("success");
            console.log(result);
            const tokenObject = utils.issueJWT(result[0]);
            const sendValue = {
              userId: result[0]._id,
              Fname: result[0].Fname,
              message: "Successful Login",
              success: true,
              token: tokenObject.token,
              expiresIn: tokenObject.expires,
            };
            callback(null, sendValue);
          } else {
            const sendValue = {
              err: "Username and Password combination incorrect.",
            };
            callback(null, sendValue);
          }
        });
      } else {
        const sendValue = {
          err: "Username and Password combination incorrect.",
        };
        callback(null, sendValue);
      }
    })
    .catch();
};
exports.handle_request = handle_request;
