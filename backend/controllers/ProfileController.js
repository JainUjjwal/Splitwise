const db = require("../dbconnection");

const get_userInfo = (req, res) => {
  const username = req.query.username;
  console.log(req.query.username);
  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log(result[0].userId);
        res.send({userInformation: result})
      } else {
        res
          .status(252)
          .send({ message: "User Info not found" });
      }
    }
  );
    // res.send({ userInformation : {
    //     username: "a@a.com",
    //     firstName: "Ujjwal",
    //     phoneNumber: "4085496787",
    //     currency: "USD",
    //     language: "English",
    //     timezone: "PST",
    //   }});
  };
  
const post_userInfo = (req,res) =>{
    console.log(req.body);
    res.send({message:'updated information recieved'});
}

  module.exports = { get_userInfo, post_userInfo };
  