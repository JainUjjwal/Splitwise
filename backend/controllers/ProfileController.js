const db = require("../dbconnection");

const get_userInfo = (req, res) => {
  const username = req.query.username;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log(result);
        res.send(result);
      } else {
        res.status(252).send({ message: "User Info not found" });
      }
    }
  );
};

const post_userInfo = (req, res) => {
  const currentUser = req.body.userId;
  const username = req.body.username;
  const Fname = req.body.Fname;
  const phoneNumber = req.body.phoneNumber;
  const lang = req.body.lang;
  const currency = req.body.currency;
  const timezone = req.body.timezone;

  db.query(
    "UPDATE users SET username = ?, Fname = ?, phoneNumber = ?, lang = ?, timezone = ?, currency=? WHERE userId = ?",
    [username, Fname, phoneNumber, lang, timezone, currency, currentUser],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (req.files) {
          const image = req.files.image;
          uploadPath =
            __dirname +
            "/../../frontend/public/userImages/" +
            username +
            ".jpg";
          fs.unlink(uploadPath).then(()=>{
            image.mv(uploadPath, function (err) {
              if (err) return res.status(500).send(err);
            });
          });
        }
        res.status(201).send({ message: "updated information recieved" });
      }
    }
  );
};

module.exports = { get_userInfo, post_userInfo };
