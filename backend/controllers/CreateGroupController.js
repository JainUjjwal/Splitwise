const db = require("../dbconnection");

const createGroup = (req, res) => {
  groupName = req.body.groupName;
  currentUserId = req.session.user.userId;
  
  db.query(
    "INSERT INTO groupTable (groupName) VALUES (?)",
    groupName,
    (err, result) => {
      if (err) {
        // res.send({ err: err });
        console.log(err);
      }
    }
  );

  db.query(
    "SELECT groupID from groupTable WHERE groupName = (?);",
    groupName,
    (err, result) => {
      if (err) {
        //   res.send({ err: err });
        console.log(err);
      }
      if (result.length > 0) {
        console.log(result);
        for (i = 0; i < req.body.addedFriend.length; i++) {
          const userId = req.body.addedFriend[i].userId;
          db.query(
            "INSERT INTO invites (userId, groupId, invStatus) VALUES (?,?,?);",
            [userId, result[0].groupID, 0],
            (err, result) => {
              if (err) {
                // res.send({ err: err });
                console.log(err);
              } else {
                // res.status(251).send({ message: "Group Invites sent" })
                console.log("Group Invites sent");
              }
            }
          );
        }
        db.query(
            "INSERT INTO userGroup (userId, groupId) VALUES (?,?);",
            [currentUserId, result[0].groupID],
            (err, result) => {
              if (err) {
                // res.send({ err: err });
                console.log(err);
              } else {
                // res.status(250).send({ message: "Group Invites sent" })
                console.log("Main user added to userGroup table");
              }
            }
          );
      } else {
        res.status(252).send({ message: "Failed to create group" });
      }
    }
  );
};

module.exports = { createGroup };
