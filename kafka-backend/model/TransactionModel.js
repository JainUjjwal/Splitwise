const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    userId: String,
    Fname: String,
    groupId: String,
    amount: Number,
    discription: String,
    comments: [
      {
        userId: String,
        Fname: String,
        commentText: String,
        timeposted: {type: Date, default: Date.now()}
      },
    ],
  },
  { timestamps: true }
);

let transactions = mongoose.model("transactions", TransactionSchema);
// export default users
module.exports = transactions;
