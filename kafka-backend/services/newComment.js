const transactions = require("../model/TransactionModel");

const handle_request = async (msg, callback) => {
  let newCommentObj = {
    commentText: msg.commentText,
    Fname: msg.Fname,
    userId: msg.userId,
  };
  const action = await transactions.findOneAndUpdate(
    { _id: msg.transactionID },
    { $push: { comments: newCommentObj } }
  );
  if (action) {
      callback(null,{ message: "success" } )
  }
};

exports.handle_request = handle_request;
