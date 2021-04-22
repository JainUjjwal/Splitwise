const userRelation = require("../model/UserRelationModel");

const handle_request = async (msg, callback) => {
  const user2 = msg.user2;
  const currentUser = msg.userId;
  userRelation
    .updateMany(
      ({ user1: user2, user2: currentUser } && {
        user1: currentUser,
        user2: user2,
      }),
      { balance: 0 },
      (err, docs) => {
        if(err){
            console.log(err)
            callback(null, {err:err})
        }
        console.log(docs);
      }
    )
    .then(() => {
      console.log("done");
      callback(null, {message: "Settled Up!"})
    //   res.status(200).send({ message: "Settled Up!" });
    });
};
exports.handle_request = handle_request;
