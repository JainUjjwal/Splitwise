const groupList = (req,res) => {
    res.send({inviteGroup : [
        { id: "1", name: "Group 1" },
        { id: "2", name: "Group 2" },
      ],
      myGroups : [
        { id: "1", name: "House" },
        { id: "2", name: "Trips" },
      ]})
}

module.exports = {groupList}