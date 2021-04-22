const transactions = require("../model/TransactionModel");
const userRelation = require("../model/UserRelationModel");
const kafka = require("../kafka/client");

const addBill = async (req, res) => {
  kafka.make_request("add_bill", req.body, (err, result) => {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      // console.log("Inside else");
      if (result.err) {
        res.status(401).send(result);
      } else {
        res.status(201).send(result);
      }
    }
  });
};

const newComment = async (req, res) =>{
  kafka.make_request("new_comment", req.body, (err, result) => {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      // console.log("Inside else");
      if (result.err) {
        res.status(401).send(result);
      } else {
        res.status(201).send(result);
      }
    }
  });
  // let newCommentObj = {commentText: req.body.commentText, Fname: req.body.Fname, userId: req.body.userId} 
  // const action = await transactions.findOneAndUpdate({_id:req.body.transactionID}, { $push: { comments: newCommentObj } })
  // if(action){
  //   res.status(201).send({message: "success"})
  // }
}
module.exports = { addBill, newComment };
