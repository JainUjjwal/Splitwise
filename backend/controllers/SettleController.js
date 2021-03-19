const db = require("../dbconnection");

const settle = (req, res) => {
  
  const user2 = req.body.user2;
  const currentUser = req.body.userId;
  
  db.query(
    "UPDATE masterTable SET balance = 0 WHERE user1 = ? AND user2 = ? OR user1 = ? AND user2 = ?;",
    [currentUser, user2, user2, currentUser],
    (err, result) => {
      if (err) {
        console.log(err);
      }else{
          res.status(200).send({message:'Settled Up!'});
      }
    }
  );
};

module.exports = { settle };
