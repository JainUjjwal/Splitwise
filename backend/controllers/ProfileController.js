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
  const username = req.body.formData.username;
  const Fname = req.body.formData.Fname;
  const phoneNumber = req.body.formData.phoneNumber;
  const lang = req.body.formData.lang;
  const currency = req.body.formData.currency;
  const timezone = req.body.formData.timezone;
  
  if(req.files){
  const image = req.files.image;
  uploadPath =
    __dirname + "/../../frontend/public/userImages/" + username + ".jpg";
  image.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });}
  db.query(
    "UPDATE users SET username = ?, Fname = ?, phoneNumber = ?, lang = ?, timezone = ?, currency=? WHERE userId = ?",
    [username, Fname, phoneNumber, lang, timezone, currency, currentUser],
    (err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.status(201).send({ message: "updated information recieved" });
      }
    }
  );
};

module.exports = { get_userInfo, post_userInfo };
