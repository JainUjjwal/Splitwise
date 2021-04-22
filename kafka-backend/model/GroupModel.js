const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  groupName: { type: String, required: true },
  groupImage: String,
  groupMembers: {
    type: Array,
    default: [
      {
        userId: String,
        inviteStatus: Number,
      },
    ],
  },
});

let groups = mongoose.model("groups", GroupSchema);
// export default users
module.exports = groups;
