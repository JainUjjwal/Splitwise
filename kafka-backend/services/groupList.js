const groups = require("../model/GroupModel");

const handle_request = async (msg, callback) => {
  console.log("this is msg");
  console.log(msg)
  const userId = msg.userId;
  const myGroups = [];
  await groups.find(
    { groupMembers: { $elemMatch: { userId: userId, inviteStatus: 1 } } },
    (err, result) => {
        if(err){
            callback(null,{err:err})
        }
      result.forEach((group) => {
        myGroups.push({ id: group._id, name: group.groupName });
      });

      if (result.length > 0) {
        callback(null, { myGroups: myGroups });
      }
    }
  );
};
exports.handle_request = handle_request;
