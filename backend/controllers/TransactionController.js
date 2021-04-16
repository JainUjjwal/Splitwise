const transactions = require("../model/TransactionModel");
const userRelation = require("../model/UserRelationModel");

const addBill = async (req, res) => {
  const amount = req.body.amount;
  const discription = req.body.discription;
  const groupId = req.body.groupId;
  const currentUser = req.body.userId;
  const Fname = req.body.Fname;
  newTransaction = new transactions({
    userId: currentUser,
    groupId: groupId,
    amount: amount,
    discription: discription,
    Fname: Fname,
  });
  console.log(newTransaction);
  await newTransaction.save().then(() => {
    res.status(201).json({ message: "Transaction Added" });
  });
  userRelation.find({ groupId: groupId }, (err, result) => {
    let total_group_members = 1;
    result.forEach((element) => {
      if (element.user1 == currentUser) {
        total_group_members++;
      }
    });
    console.log("group member count: " + total_group_members);
    let perPerson = amount / total_group_members;
    result.forEach((element) => {
      if (element.user1 == currentUser) {
        // {groupId:"60703efa7f1d2b2af45411c2", user1:"606e94b157f88b28a83586f8"}
        let updatedBalance = element.balance + perPerson;
        userRelation.findOneAndUpdate(
          { groupId: groupId, user1: currentUser, user2: element.user2 },
          { balance: updatedBalance },
          { new: true },
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      if (element.user2 == currentUser) {
        let updatedBalance = element.balance - perPerson;
        userRelation.findOneAndUpdate(
          { groupId: groupId, user1: element.user1, user2: currentUser },
          { balance: updatedBalance },
          { new: true },
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    });
  });
};

module.exports = { addBill };
