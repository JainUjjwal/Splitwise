const users = require("../model/UsersModel");
const userRelation = require("../model/UserRelationModel");

const handle_request = async (msg, callback) => {
  console.log(msg)
  const currentUser = msg.userId;
  let userList;
  let newDataBlock = {};
  await users.find({ _id: { $ne: msg.userId } }, (err, result) => {
    // console.log(result)
    userList = result;
  });
  await userRelation.find({ user1: msg.userId }, async (err, result) => {
    for (let i = 0; i < result.length; i++) {
      if (result[i].user2 in newDataBlock) {
        let updatedBalance =
          newDataBlock[result[i].user2].amount + result[i].balance;
        newDataBlock[result[i].user2].amount = updatedBalance;
        if (updatedBalance >= 0) {
          newDataBlock[result[i].user2].typeClass = true;
        } else {
          newDataBlock[result[i].user2].typeClass = false;
        }
      } else {
        let userinfo = await users.findOne({_id:result[i].user2}).exec()
        console.log()
        newDataBlock[result[i].user2] = {
          id: result[i].user2,
          Fname: userinfo.Fname,
          amount: result[i].balance,
          typeClass: result[i].balance >= 0 ? true : false,
        };
      }
    }
    // console.log(newDataBlock);
    let sendData = { userList: userList, dataBlock: newDataBlock }
    await callback(null,sendData)
  });
};
exports.handle_request = handle_request;
