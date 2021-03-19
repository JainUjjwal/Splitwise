const db = require("../dbconnection");

const groupList = (req, res) => {
  const userId = req.body.userId;
  const myGroups = [];
  db.query(
    " select * from userGroup inner join groupTable on userGroup.groupId = groupTable.groupId where userId = (?)",
    userId,
    (err, result) => {
      if (err) {
        //   res.send({ err: err });
        console.log(err);
        res.status(101).send({ err: "User is currently in no groups." });
      } else {
        if (result.length > 0) {
          for (i = 0; i < result.length; i++) {
            myGroups.push({ id: result[i].groupId, name: result[i].groupName });
          }
          res.status(201).send({
            myGroups: myGroups,
          });
        }
      }
    }
  );
};
const getInvites = (req, res) => {
  const userId = req.query.userId;
  const inviteGroup = [];
  db.query(
    " select * from groupTable Inner join invites on groupTable.groupId = invites.groupId where userId = (?) AND invStatus = (?);",
    [userId, 0],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(101).send({ err: "User is currently in no groups." });
      } else {
        if (result.length > 0) {
          for (i = 0; i < result.length; i++) {
            inviteGroup.push({
              id: result[i].groupId,
              name: result[i].groupName,
              invStatus: result[i].invStatus,
            });
          }
          res.status(201).send({
            inviteGroup: inviteGroup,
          });
        }
      }
    }
  );
};
module.exports = { groupList, getInvites };
