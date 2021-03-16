const db = require("../dbconnection");

const accept = (req, res) => {
  const currentUser = req.session.user.userId;
  acceptedGroupId = req.body.acceptedGroup.id;
  // console.log()
  db.query(
    "INSERT INTO userGroup (userId, groupId) values (?,?); UPDATE invites SET invStatus = 1 WHERE invites.userId = (?) AND invites.groupId = (?)",
    [currentUser, acceptedGroupId, currentUser, acceptedGroupId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(269).send("request accepted");
        let balance = 0;
        db.query(
          "SELECT userId FROM userGroup WHERE groupId = (?)",
          [acceptedGroupId],
          (err, result) => {
            db.query(
              "DELETE FROM masterTable WHERE groupId = (?);",
              [acceptedGroupId],
              (err, result) => {
                if (err) {
                  console.log(err);
                }
              }
            );
            for (i = 0; i < result.length; i++) {
              for (j = 0; j < result.length; j++) {
                if (result[i].userId != result[j].userId) {
                  db.query(
                    "INSERT INTO masterTable VALUES (?,?,?,?)",
                    [
                      result[i].userId,
                      result[j].userId,
                      acceptedGroupId,
                      balance,
                    ],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                }
              }
            }
          }
        );
      }
    }
  );
};

const reject = (req, res) => {
  const currentUser = req.session.user.userId;
  rejectedGroupId = req.body.rejectedGroup.id;
  // console.log()
  db.query(
    "UPDATE invites SET invStatus = 2 WHERE invites.userId = (?) AND invites.groupId = (?)",
    [currentUser, rejectedGroupId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(269).send("request rejected succesfully.");
      }
    }
  );
};

module.exports = { accept, reject };
