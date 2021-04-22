// const db = require("../dbconnection");
const bcrypt = require("bcrypt");
const utils = require("../lib/utils");
const kafka = require("../kafka/client");

const login_user_post = async (req, res) => {
  kafka.make_request("login", req.body, (err, result) => {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      // console.log("Inside else");
      if (result.err) {
        res.status(250).send({
          message: "Username and Password combination incorrect.",
        });
      res.end("Login unsuccessful");
      }else{
        res.status(200).send(result);
        res.end("Login Successful");
      }
      
    }
  });
  // const username = req.body.username;
  // const password = req.body.password;
  // await users.find({ username: username }, (err, result) => {
  //   if (result) {
  //     bcrypt.compare(password, result[0].password, (error, response) => {
  //       if (response) {
  //         console.log("success");
  //         req.session.user = result;
  //         // res.writeHead(200, {
  //         //   "Content-Type": "text/plain",
  //         // })
  //         console.log(result);
  //         const tokenObject = utils.issueJWT(result[0]);
  //         res.status(200).send({
  //           userId: result[0]._id,
  //           Fname: result[0].Fname,
  //           message: "Successful Login",
  //           success: true,
  //           token: tokenObject.token,
  //           expiresIn: tokenObject.expires,
  //         });
  //         res.end("Login Successful");
  //       } else {
  //         res.status(250).send({
  //           message: "Username and Password combination incorrect.",
  //         });
  //       }
  //     });
  //   } else {
  //     res
  //       .status(252)
  //       .send({ message: "Username and Password combination incorrect." });
  //   }
  // });
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
