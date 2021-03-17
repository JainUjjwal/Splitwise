const db = require("../dbconnection");

const leave = (req, res) => {
  console.log(req.body.groupId);
  const groupId = req.body.groupId;
  const currentUser = req.session.user.userId;
  //check master table on groupId for any balance. if not 0. send fail.
  //else...... remove entry from userGroup, masterTable,
  db.query(
    "SELECT * FROM masterTable WHERE groupId = ? AND user1=?",
    [groupId, currentUser, currentUser],
    (err, result) => {
      if (err) {
        console.log(err);
        return
      } else {
        let flagArray = [];
        result.forEach((element) => {
          if (element.balance == 0) {
            flagArray.push(0);
          } else {
            flagArray.push(1);
          }
        });
        let sum = flagArray.reduce((a, b) => a + b, 0);
        if (sum != 0) {
          res.status(202).json({ message: "Balance not settled." });
          return 
        } else {
          db.query(
            "DELETE FROM masterTable WHERE groupId = ? AND (user1=? OR user2=?); DELETE FROM userGroup WHERE groupId = ? AND userId = ?;",
            [groupId, currentUser, currentUser,groupId, currentUser],
            (err,result)=>{
                if(err){
                    console.log('uh oh');
                    console.log(err);
                    return
                }else{
                    console.log('group left');
                    res.status(201).json({message:'successfuly left the group.'});
                    return
                    
                }
            }
          );
        }
      }
    }
  );
};

// in flag array. if any element>1 send err else delete * from masterTable where groupId = ? AND (user1=? OR user2=?)

module.exports = { leave };
