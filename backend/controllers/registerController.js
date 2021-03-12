const db = require('../dbconnection')
const bcrypt = require("bcrypt");
// Bcrypt scrambler
const saltRounds = 10;

const register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const Fname = req.body.Fname;
    const num = req.body.phoneNumber;
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

  module.exports= {register}