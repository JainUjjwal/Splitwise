const db = require("../dbconnection");

const updateMaster = (valueArray,res,flag) => {

  db.query(
    "UPDATE masterTable SET balance = ? WHERE user1 = ? AND groupID = ? AND user2 = ?;",
    [valueArray[0], valueArray[1], valueArray[2], valueArray[3]],
    (err, result) => {
      if (err) {
        // console.log("IT BROKE");
        console.log(err);
        return;
      } else {
        flag = true;
        return;
        console.log("HOLY SHIT IT WORKED. I AM A GENIUS!");
      }
    }
  );
};

const addBill = async (req, res) => {
  const amount = req.body.amount;
  const discription = req.body.discription;
  const groupId = req.body.groupId;
  const currentUser = req.body.userId;
  await db.query(
    "INSERT INTO transactionTable (groupId, discription, amount) VALUES (?,?,?);",
    [groupId, discription, amount],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  db.query(
    "SELECT a.userId FROM userGroup AS a INNER JOIN groupTable AS b ON a.groupId = b.groupId INNER JOIN users AS c ON a.userId=c.userId where a.groupId = (?); SELECT * FROM transactionTable;",
    [groupId],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(result[1][result[1].length - 1].transactionId);
        let transactionId = result[1][result[1].length - 1].transactionId;
        let amountPerPerson = amount / result[0].length;
        // SENDING MUTIPLE VALUES IN ONE QUERY
        let values = [];
        result[0].forEach((element) => {
          currentUser != element.userId
            ? values.push([
                currentUser,
                element.userId,
                transactionId,
                amountPerPerson,
              ])
            : "";
        });
        console.log(values);
        db.query(
          "INSERT INTO userTransaction (user1, user2, transactionId, amountPerPerson) VALUES ?;",
          [values],
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
          }
        );

        db.query(
          "SELECT * from masterTable WHERE user1 = (?) AND groupID=(?);",
          [currentUser, groupId],
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            } else {
              result.forEach((element) => {
                let newBalance = element.balance + amountPerPerson;
                let negativeBalance = 0 - newBalance;
                let positiveUpdate = [
                  newBalance,
                  currentUser,
                  groupId,
                  element.user2,
                ];
                updateMaster(positiveUpdate,res);
                let negativeUpdate = [
                  negativeBalance,
                  element.user2,
                  groupId,
                  currentUser,
                ];
                updateMaster(negativeUpdate,res);
              });
              res.status(201).json({ message: "Transaction Added" });
            }
          }
        );
      }
    }
  );
};

module.exports = { addBill };
