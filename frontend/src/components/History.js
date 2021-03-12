import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import axios from "axios";
const History = () => {
  const groupList = ["House", "Trip", "xyz"];
  let [transactionHistory, setTransactionHistory] = useState();
  let [filteredHistory, setFilteredHistory] = useState();
  let [groups, setGroups] = useState();
  
  useEffect(() => {
    axios.post("http://localhost:3001/history").then((res)=>{
      setTransactionHistory(res.data.store);
      setFilteredHistory(res.data.store)
      setGroups(res.data.groupList)
    })
    
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
