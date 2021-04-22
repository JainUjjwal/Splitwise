const mongoose = require("mongoose");

const UserRelation = mongoose.Schema({
  user1: {type:Object, default:{userId: String, Fname: String}},
  user2: {type:Object, default:{userId: String, Fname: String}},
  groupId: String,
  balance: Number,
});

let userRelation = mongoose.model("UserRelation", UserRelation);
// export default users
module.exports = userRelation;
