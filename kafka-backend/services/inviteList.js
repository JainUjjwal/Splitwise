const groups = require("../model/GroupModel");

const handle_request = async (msg, callback) => {
  const userId = msg.userId;
  const inviteGroup = [];
  await groups.find(
    { groupMembers: { $elemMatch: { userId: userId, inviteStatus: 0 } } },
    (err, result) => {
      if (err) {
        callback(null, { err: err });
      }
      

      if (result.length > 0) {
        result.forEach((group) => {
          inviteGroup.push({ id: group._id, name: group.groupName });
        });
          console.log("sending invite list ")
        callback(null, { inviteGroup: inviteGroup });
      }else{
        callback(null, {err:"no invites"})
      }
    }
  );
};
exports.handle_request = handle_request;
