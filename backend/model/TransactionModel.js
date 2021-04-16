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
        commentText: String,
      },
    ],
  },
  { timestamps: true }
);

let transactions = mongoose.model("transactions", TransactionSchema);
// export default users
module.exports = transactions;
