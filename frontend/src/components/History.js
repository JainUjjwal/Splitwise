import React, { useEffect, useState } from "react";
import { history } from "../reducers/HistoryReducers";
import { useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";

const History = () => {
  const user = useSelector((state) => state.user);
  const redux_userId = user ? user.userId : false;

  const redux_history = useSelector((state) => state.history);
  let redux_transactions = redux_history ? redux_history.transactions : false;
  const redux_groups = redux_history ? redux_history.groups : false;

  let [filteredHistory, setFilteredHistory] = useState(redux_transactions);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(history({ redux_userId: redux_userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let filteredData;
  let sortData;
  const timeFilter = () => {
    let sortBy = document.getElementById("SortBy").value;
    if (sortBy === "Oldest First") {
      sortData = Object.assign([], redux_transactions);
      sortData.reverse();
      setFilteredHistory(sortData);
    }
    if (sortBy === "Latest First") {
      setFilteredHistory(redux_transactions);
    }
  };

  const groupFilter = () => {
    let filterTerm = document.getElementById("groupSelector").value;
    if (filterTerm === "All Groups") {
      setFilteredHistory(redux_transactions);
    } else {
      filteredData = redux_transactions.filter(
        (element) => element.group === filterTerm
      );
      redux_transactions = filteredData;
      setFilteredHistory(filteredData);
    }
  };
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
          {redux_groups ? (
            redux_groups.map((groupname, index) => (
              <option key={index}>{groupname}</option>
            ))
          ) : (
            <option>No Groups Available</option>
          )}
        </select>
      </div>
      <div>
        {redux_transactions.length>0? 
          filteredHistory && (filteredHistory.length>1 || filteredHistory[0].amount)
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
            : redux_transactions.map((transaction, index) => (
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
        : "No transactions in history" }
        
      </div>
    </div>
  );
};

export default History;
