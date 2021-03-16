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
        res.send({userInformation: result})
      } else {
        res
          .status(252)
          .send({ message: "User Info not found" });
      }
    }
  );
  };
  
const post_userInfo = (req,res) =>{
    // console.log(req.body);
    res.send({message:'updated information recieved'});
}

  module.exports = { get_userInfo, post_userInfo };
  