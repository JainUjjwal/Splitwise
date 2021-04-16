const userRelation = require("../model/UserRelationModel");
const settle = (req, res) => {
  const user2 = req.body.user2;
  const currentUser = req.body.userId;
  userRelation
    .updateMany(
      ({ user1: user2, user2: currentUser } && {
        user1: currentUser,
        user2: user2,
      }),
      { balance: 0 },
      (err, docs) => {
        if(err){console.log(err)}
        console.log(docs);
      }
    )
    .then(() => {
      console.log("done");
      res.status(200).send({ message: "Settled Up!" });
    });
};

module.exports = { settle };
