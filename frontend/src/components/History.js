import React, { useEffect, useReducer, useState } from "react";
import { history } from "../reducers/HistoryReducers";
import HistoryReducers from "../reducers/HistoryReducers"
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const History = () => {
  const user = useSelector((state) => state.user);
  const redux_userId = user ? user.userId : false;
  
  //this doesn't show updated store values!

  const redux_history = setTimeout( useSelector((state)=> state.history), 1000);
  const redux_transactions = redux_history ? redux_history.transactions : false;
  const redux_groups = redux_history ? redux_history.groups : false;

  let [done, setDone] = useState(false);
  // let [transactionHistory, setTransactionHistory] = useState();
  let [filteredHistory, setFilteredHistory] = useState();
  let [groups, setGroups] = useState();
  let dispatch = useDispatch();
  const [transactionHistory, dispatch1] = useReducer(HistoryReducers, "test test") 
  useEffect(() => {
    dispatch1({type: "setHistory"})
    console.log(transactionHistory);
    // dispatch(history({ redux_userId: redux_userId })).then((res)=>{
    //   console.log(res);
    //   getData();
    //   console.log('in .then')
    // });
    // getData();
    console.log('render')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = () => {
    console.log('getData called');
    // setTransactionHistory(redux_transactions);
    setGroups(redux_groups);
    setFilteredHistory(redux_transactions);
    setDone(true);
    console.log(redux_history);
    console.log(done);
    // await axios
    //   .post("http://localhost:3001/history", { userId: redux_userId })
    //   .then((res) => {
    //     setTransactionHistory(res.data.newStore);
    //     setFilteredHistory(res.data.newStore);
    //     setGroups(res.data.groupList);
    //   });
  };


  let filteredData;
  let sortData;

  const timeFilter = () => {
    let sortBy = document.getElementById("SortBy").value;
    if (sortBy === "Oldest First") {
      sortData = Object.assign([], transactionHistory);
      sortData.reverse();
      setFilteredHistory(sortData);
    }
    if (sortBy === "Latest First") {
      setFilteredHistory(transactionHistory);
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
  const isLoggedIn = user ? user.isLogged : false;
  let redirectVar = null;
  if (!isLoggedIn) {
    redirectVar = <Redirect to="/login" />;
  }
  return (
    
    <div className="container">
      {console.log(transactionHistory)}
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
