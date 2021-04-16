// const db = require("../dbconnection");
const groups = require("../model/GroupModel");
const users = require("../model/UsersModel");
const userRelation = require("../model/UserRelationModel");
const accept = async (req, res) => {
  const currentUser = req.body.userId;
  acceptedGroupId = req.body.acceptedGroup.id;
  await groups
    .findOneAndUpdate(
      { _id: acceptedGroupId, "groupMembers.userId": currentUser },
      { $set: { "groupMembers.$.inviteStatus": 1 } },
      { new: true },
      async (err, updateResult) => {
        console.log("\n\n\n Update Result");
        console.log(updateResult);
        let updateObj = []
        updateResult.groupMembers.forEach((member) => {
          if (member.inviteStatus == 1 && member.userId != currentUser) {
            updateObj.push({
              user1: currentUser,
              user2: member.userId,
              balance: 0,
              groupId: updateResult._id,
            });
            updateObj.push({
              user1: member.userId,
              user2: currentUser,
              balance: 0,
              groupId: updateResult._id,
            });
          }
        });
        updateObj.forEach(async (element) => {
          let newUserRelation = new userRelation(element);
          await newUserRelation.save().then(console.log("saved"));
        });
      }
    )
    .then(() => {
      res.status(269).send("request accepted");
    });
};

const reject = async (req, res) => {
  const currentUser = req.body.userId;
  rejectedGroupId = req.body.rejectedGroup.id;
  await groups
    .findOneAndUpdate(
      { _id: rejectedGroupId },
      { $pull: { groupMembers:{userId: currentUser} } },
      { new: true },
      (err, result) => {
        console.log(result);
      }
    )
    .then(() => {
      res.status(269).send("request rejected succesfully.");
    }).catch((err)=>{console.log(err)});
};

module.exports = { accept, reject };
