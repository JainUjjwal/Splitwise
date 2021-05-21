const db = require("../dbconnection");
const groups = require("../model/GroupModel");
const userrelation = require("../model/UserRelationModel");
const leave = async (req, res) => {
  // console.log(req.body.groupId);
  const groupId = req.body.groupId;
  const currentUser = req.body.userId;
  //check master table on groupId for any balance. if not 0. send fail.
  //else...... remove entry from userGroup, masterTable,

  await userrelation.find(
    { groupId: groupId, user1: currentUser },
    async (err, result) => {
      if (err) {
        console.log(err);
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
          res.json({ message: "Balance not settled." });
          return;
        } else {
          await groups
            .findOneAndUpdate(
              { _id: groupId, "groupMembers.userId": currentUser },
              { $set: { "groupMembers.$.inviteStatus": 2 } }
            )
            .then(async () => {
              await userrelation.deleteMany({
                user1: currentUser,
                groupId: groupId,
              });
              await userrelation.deleteMany({
                user2: currentUser,
                groupId: groupId,
              });
              console.log("group left");
              res.status(201).json({ message: "successfuly left the group." });
            });
        }
      }
    }
  );
};

// in flag array. if any element>1 send err else delete * from masterTable where groupId = ? AND (user1=? OR user2=?)

module.exports = { leave };
