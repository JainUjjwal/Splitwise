const kafka = require("../kafka/client");

const groupList = async (req, res) => {
  kafka.make_request("group_list", req.body, (err, result) => {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      // console.log("Inside else");
      if (result.err) {
        res.status(401).send(result);
      } else {
        res.status(201).send(result)
      }
    }
  });
  // const userId = req.body.userId;
  // const myGroups = [];
  // await groups.find(
  //   { groupMembers: { $elemMatch: { userId: userId, inviteStatus: 1 } } },
  //   (err, result) => {
  //     result.forEach(group => {
  //       myGroups.push({ id: group._id, name: group.groupName })
  //     });

  //     if (result.length > 0) {
  //       res.status(201).send({
  //         myGroups: myGroups,
  //       });
  //     }
  //   }
  // );
};
const getInvites = async (req, res) => {
  kafka.make_request("invite_list", req.query, (err, result) => {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      if (result.err) {
        res.status(401).send(result);
      } else {
        console.log("sending invite")
        res.status(201).send(result)
      }
    }
  });
  // const userId = req.query.userId;
  // const inviteGroup = [];
  // await groups.find(
  //   { groupMembers: { $elemMatch: { userId: userId, inviteStatus: 0 } } },
  //   (err, result) => {
  //     result.forEach(group => {
  //       inviteGroup.push({ id: group._id, name: group.groupName })
  //     });

  //     if (result.length > 0) {
  //       res.status(201).send({
  //         inviteGroup: inviteGroup,
  //       });
  //     }
  //   }
  // );
};

module.exports = { groupList, getInvites };