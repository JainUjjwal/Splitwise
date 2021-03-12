const transactionList = (req,res) => {
    const  memberList = [
        { name: "Ujjwal", amount: 1000, status: true },
        { name: "Pavan", amount: 500, status: false },
        { name: "Shubham", amount: 500, status: false },
      ]
    let dummyInfo = { groupName: "House", members: memberList };
    res.send({transactionList : [
        { discription: "Rent", amount: 2000, typeClass: true },
        { discription: "Trip", amount: 1000, typeClass: false },
        { discription: "Food", amount: 15, typeClass: true },
        { discription: "Drinks", amount: 15, typeClass: false },
      ], dummyInfo 
     })
}

module.exports = {transactionList}