import React, { useEffect, useState } from "react";

const History = () => {
  const groupList = ["House", "Trip", "xyz"];
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
  ];
  let [transactionHistory, setTransactionHistory] = useState();
  let [filteredHistory, setFilteredHistory] = useState(store);
  let [groups, setGroups] = useState();
  
  useEffect(() => {
    setTransactionHistory(store);
    setGroups(groupList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let filteredData;
  const groupFilter = () => {
    let filterTerm = document.getElementById("groupSelector").value;
    if (filterTerm === "All Groups") {
      filteredData = transactionHistory;
      setFilteredHistory(filteredData)
    //   setTransactionHistory(filteredData);
    } else {
      filteredData = transactionHistory.filter((element) => element.group === filterTerm);
    //   setTransactionHistory(filteredData);
    setFilteredHistory(filteredData)
    }
  };

  return (
    <div className="container">
      <div className="my-4">
        <h2>Transaction History</h2>
      </div>
      <div className="my-4 col">
        <select>
          <option>Latest First</option>
          <option>Oldest First</option>
        </select>{" "}
        <select onChange={groupFilter} id="groupSelector">
          <option>All Groups</option>
          {groups ? (
            groups.map((groupname, index) => (
              <option key={index}>{groupname}</option>
            ))
          ) : (
            <option>No Groups Available</option>
          )}
        </select>
      </div>
      <div>
        {filteredHistory
          ? filteredHistory.map((transaction, index) => (
              <div key={index} className="row pt-4">
                <div className="col">
                  {transaction.payer} added <b>"{transaction.discription}"</b>{" "}
                  in <b>"{transaction.group}"</b>
                </div>
                {transaction.status ? (
                  <div style={{ color: "green" }}>
                    You get back: ${transaction.amount}
                  </div>
                ) : (
                  <div style={{ color: "red" }}>
                    You owe: ${transaction.amount}
                  </div>
                )}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default History;
