// const db = require("../dbconnection");
const groups = require("../model/GroupModel");

const createGroup = async (req, res) => {
  groupName = req.body.groupName;
  currentUserId = req.body.currentUser;
  let addedFriend = [{userId:currentUserId, inviteStatus: 1}]
   req.body.addedFriend.forEach(element => {
     addedFriend.push({userId:element.userId, inviteStatus: 0})
   });
  let newGroup = new groups({
    groupName: req.body.groupName,
    groupMembers: addedFriend,
  });
  await groups.find({groupName:groupName}, async(err, result)=>{
    if(err){console.log(err)}
    else{
      if(result.length>0){
        //condition on same group already existing
      }else{
        await newGroup.save().then(()=>{
          console.log("group entry created")
          res.status(251).end()
        })
      }
    }
  })
};

module.exports = { createGroup };
