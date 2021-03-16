const db = require("../dbconnection");

const addBill = (req, res) => {
  const amount = req.body.amount;
  const discription = req.body.discription;
  const groupId = req.body.groupId;
  const currentUser = req.session.user.userId;
  db.query(
    "INSERT INTO transactionTable (groupId, discription, amount) VALUES (?,?,?);",
    [groupId, discription, amount],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  db.query(
    "SELECT a.userId FROM userGroup AS a INNER JOIN groupTable AS b ON a.groupId = b.groupId INNER JOIN users AS c ON a.userId=c.userId where a.groupId = (?); SELECT * FROM transactionTable;",
    [groupId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result[1][result[1].length - 1].transactionId);
        let transactionId = result[1][result[1].length - 1].transactionId;
        amountPerPerson = amount / (result.length + 1);
        for (i = 0; i < result[0].length; i++) {
          if (currentUser != result[0][i].userId) {
            db.query(
              "INSERT INTO userTransaction (user1, user2, transactionId, amountPerPerson) VALUES (?,?,?,?);",
              [
                currentUser,
                result[0][i].userId,
                transactionId,
                amountPerPerson,
              ],
              (err, result) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
        db.query(
          "SELECT * from masterTable WHERE user1 = (?) AND groupID=(?);",
          [currentUser, groupId],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (result.length > 0) {
                for (i = 0; i < result.length; i++) {
                  let newBalance = result[i].balance + amountPerPerson;
                  let negativeBalance = 0 - newBalance;
                  db.query(
                    "UPDATE masterTable SET balance = (?) WHERE user1 = (?) AND groupID = (?) AND user2 = (?); UPDATE masterTable SET balance = (?) WHERE user1 = (?) AND groupID=(?) AND user2 = (?)",
                    [
                      newBalance,
                      currentUser,
                      groupId,
                      result[i].user2,
                      negativeBalance,
                      result[i].user2,
                      groupId,
                      currentUser,
                    ],
                    (err, result) => {
                      if (err) {
                        console.log("IT BROKE");
                        console.log(err);
                      } else {
                        console.log("HOLY SHIT IT WORKED. I AM A GENIUS!");
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

module.exports = { addBill };
