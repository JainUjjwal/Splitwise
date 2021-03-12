const transactionList = (req, res) => {
  const store = [
    {
      payer: "user 1",
      payee: "user 2",
      discription: "fruits",
      amount: 20,
      group: "Trip",
      status: true,
    },
    {
      payer: "user 3",
      payee: "user 4",
      discription: "eggs",
      amount: 3,
      group: "House",
      status: false,
    },
    {
      payer: "user 1",
      payee: "user 4",
      discription: "Settle Up",
      amount: 25,
      group: "xyz",
      status: true,
    },
    {
      payer: "user 2",
      payee: "user 1",
      discription: "cheese",
      amount: 6,
      group: "House",
      status: false,
    },
    {
      payer: "user X",
      payee: "user Y",
      discription: "new Controller based transaction from backend",
      amount: 10,
      group: "Backend",
      status: false,
    },
  ];

  let groupList = [];
  // Getting rid of duplicated group names.
  store.forEach((element) => {
    if (!groupList.includes(element.group)) {
      groupList.push(element.group);
    }
  });
  res.send({ store, groupList });
};

module.exports = { transactionList };
