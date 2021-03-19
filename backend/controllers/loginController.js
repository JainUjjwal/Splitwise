const db = require("../dbconnection");
const bcrypt = require("bcrypt");


const login_user_post = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users INNER JOIN passwordTable ON users.userId = passwordTable.userId WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].pass, (error, response) => {
          if (response) {
            req.session.user = result[0];
            // res.writeHead(200, {
            //   "Content-Type": "text/plain",
            // })
            res.status(200).send({userId: result[0].userId,message:"Successful Login"});
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
    }
  );
  // console.log(req.session.user);
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
