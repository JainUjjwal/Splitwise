const db = require("../dbconnection");
const bcrypt = require("bcrypt");
// Bcrypt scrambler
const saltRounds = 10;

const register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const Fname = req.body.Fname;
  const num = req.body.phoneNumber;
  console.log(num);
  const image = req.files.image;
  uploadPath ="/userImages/" + username + ".jpg";
  image.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.status(203).send({ err: "user already exists" });
        } else {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              console.log(err);
            }
            console.log("right before db query " + num);
            db.query(
              "INSERT INTO users (username, Fname, phoneNumber, imgPath) VALUES (?,?,?,?); INSERT INTO passwordTable(pass) VALUES (?)",
              [username, Fname, num, uploadPath, hash],
              (err, result) => {
                if (err) {
                  console.log('oops 1');
                  res.send({ err: err });
                } else {
                  console.log('yes 1')
                  res.status(202).send({ message: "Sign up successful" });
                }
              }
            );
          });
        }
      }
    }
  );
// Setting session variable
  db.query(
    "select * from users where username = ?",
    [username],
    (err, result) => {
      req.session.user = result;
    }
  );
};

module.exports = { register };
