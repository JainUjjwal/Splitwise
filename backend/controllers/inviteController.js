const db = require("../dbconnection");

const accept = (req, res) => {
  const currentUser = req.session.user.userId;
  acceptedGroupId = req.body.acceptedGroup.id;
  // console.log()
  db.query(
    "INSERT INTO userGroup (userId, groupId) values (?,?); UPDATE invites SET invStatus = 1 WHERE invites.userId = (?) AND invites.groupId = (?)",
    [currentUser, acceptedGroupId,currentUser, acceptedGroupId],
    (err, result) => {
      if (err) {
        console.log(err);
      }else{
          res.send('request accepted');
      }
    }
  );
};

const reject = (req, res) =>{
    const currentUser = req.session.user.userId;
  rejectedGroupId = req.body.rejectedGroup.id;
  // console.log()
  db.query(
    "UPDATE invites SET invStatus = 2 WHERE invites.userId = (?) AND invites.groupId = (?)",
    [currentUser, rejectedGroupId],
    (err, result) => {
      if (err) {
        console.log(err);
      }else{
          res.send('request rejected succesfully.');
      }
    }
  );
}

module.exports = { accept, reject };
