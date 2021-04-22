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
      result.forEach((group) => {
        inviteGroup.push({ id: group._id, name: group.groupName });
      });

      if (result.length > 0) {
          console.log("sending invite list ")
        callback(null, { inviteGroup: inviteGroup });
      }
    }
  );
};
exports.handle_request = handle_request;
