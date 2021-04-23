const users = require("../model/UsersModel");

const handle_request = async (msg, callback) => {
    const userId = msg.userId;
    await users.findById(userId, (err, result) => {
      if (err) {
        callback(null,{ err: err });
      }
      if (result) {
        callback(null, result)
      } else {
          callback(null, {message:"User Info not found"})
      }
    });
};

exports.handle_request = handle_request;
