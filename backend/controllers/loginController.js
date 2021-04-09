// const db = require("../dbconnection");
const bcrypt = require("bcrypt");
const users = require("../model/UsersModel");

const login_user_post = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await users.find({ username: username }, (err, result) => {
    if (result) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          console.log("success")
          req.session.user = result;
          // res.writeHead(200, {
          //   "Content-Type": "text/plain",
          // })
          console.log(result)
          res.status(200).send({
            userId: result[0]._id,
            Fname: result[0].Fname,
            message: "Successful Login",
          });
          res.end("Login Successful");
        } else {
          res.status(250).send({
            message: "Username and Password combination incorrect.",
          });
        }
      });
    } else {
      res
        .status(252)
        .send({ message: "Username and Password combination incorrect." });
    }
  });
};

const login_user_get = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

module.exports = {
  login_user_post,
  login_user_get,
};
