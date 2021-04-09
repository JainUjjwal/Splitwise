const groups = require("../model/GroupModel");

const groupList = async (req, res) => {
  const userId = req.body.userId;
  const myGroups = [];
  await groups.find(
    { groupMembers: { $elemMatch: { userId: userId, inviteStatus: 1 } } },
    (err, result) => {
      result.forEach(group => {
        console.log("group info ///////////////" + group)
        myGroups.push({ id: group._id, name: group.groupName })
      });

      if (result.length > 0) {
        res.status(201).send({
          myGroups: myGroups,
        });
      }
    }
  );
};
const getInvites = async (req, res) => {
  const userId = req.query.userId;
  const inviteGroup = [];
  await groups.find(
    { groupMembers: { $elemMatch: { userId: userId, inviteStatus: 0 } } },
    (err, result) => {
      result.forEach(group => {
        console.log("group info ///////////////" + group)
        inviteGroup.push({ id: group._id, name: group.groupName })
      });

      if (result.length > 0) {
        res.status(201).send({
          inviteGroup: inviteGroup,
        });
      }
    }
  );
};

module.exports = { groupList, getInvites };