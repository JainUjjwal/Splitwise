const db = require("../dbconnection");
const bcrypt = require("bcrypt");
// Bcrypt scrambler
const saltRounds = 10;

const register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const Fname = req.body.Fname;
  const num = req.body.phoneNumber;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('hello')
        if (result.length > 0) {
          console.log('hello inside')
          res.status(203).send({err:'user already exists'});
        } else {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              console.log(err);
            }
            db.query(
              "INSERT INTO users (username, Fname, phoneNumber) VALUES (?,?,?); INSERT INTO passwordTable(pass) VALUES (?)",
              [username, Fname, num, hash],
              (err, result) => {
                if (err) {
                  res.send({ err: err });
                } else {
                  res.status(202).send({ message: "Sign up successful" });
                }
              }
            );
          });
        }
      }
    }
  );

  db.query(
    "select * from users where username = ?",
    [username],
    (err, result) => {
      req.session.user = result;
    }
  );
};

module.exports = { register };
