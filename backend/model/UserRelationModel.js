const mongoose = require("mongoose");

const UserRelation = mongoose.Schema({
  user1: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
  user2: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
  groupId: String,
  balance: Number,
});

let userRelation = mongoose.model("UserRelation", UserRelation);
// export default users
module.exports = userRelation;
