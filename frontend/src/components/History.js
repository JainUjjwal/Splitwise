import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
const History = () => {
  let [transactionHistory, setTransactionHistory] = useState();
  let [filteredHistory, setFilteredHistory] = useState();
  let [groups, setGroups] = useState();

  useEffect(() => {
    axios.post("http://localhost:3001/history").then((res) => {
      setTransactionHistory(res.data.newStore);
      setFilteredHistory(res.data.newStore);
      setGroups(res.data.groupList);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let filteredData;
  let sortData;
  const timeFilter = () => {
    let sortBy = document.getElementById("SortBy").value;
    console.log(sortBy);
    if (sortBy === "Oldest First") {
      sortData = Object.assign([],transactionHistory);
      sortData.reverse();
      setFilteredHistory(sortData);
    } 
    if (sortBy === "Latest First") {
      setFilteredHistory(transactionHistory);
      console.log(filteredHistory);
    }
  };
  const groupFilter = () => {
    let filterTerm = document.getElementById("groupSelector").value;
    if (filterTerm === "All Groups") {
      filteredData = transactionHistory;
      setFilteredHistory(filteredData);
    } else {
      filteredData = transactionHistory.filter(
        (element) => element.group === filterTerm
      );
      setFilteredHistory(filteredData);
    }
  };
  const user = useSelector((state) => state.user);
  const isLoggedIn = user ? user.isLogged : false;
  let redirectVar = null;
  if (!isLoggedIn) {
    redirectVar = <Redirect to="/login" />;
  }
  return (
    <div className="container">
      {redirectVar}
      <div className="my-4">
        <h2>Transaction History</h2>
      </div>
      <div className="my-4 col">
        <select onChange={timeFilter} id="SortBy">
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
                  in <b>"{transaction.group}"</b> at {transaction.timeStamp}
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
