
// const kafka = require("../kafka/client");

const settle = (req, res) => {
  // kafka.make_request("settle", req.body, (err, result) => {
  //   if (err) {
  //     console.log("Inside err");
  //     res.json({
  //       status: "error",
  //       msg: "System Error, Try Again.",
  //     });
  //   } else {
  //     // console.log("Inside else");
  //     if (result.err) {
  //       res.status(401).send(result);
  //     } else {
  //       res.status(200).send(result);
  //     }
  //   }
  // });
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
