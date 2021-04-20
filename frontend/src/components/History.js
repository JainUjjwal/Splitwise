import React, { useEffect, useState } from "react";
import { history } from "../reducers/HistoryReducers";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

const History = () => {
  const user = useSelector((state) => state.user);
  const redux_userId = user ? user.userId : false;

  const redux_history = useSelector((state) => state.history);
  let redux_transactions = redux_history ? redux_history.transactions : false;
  const redux_groups = redux_history ? redux_history.groups : false;

  let [filteredHistory, setFilteredHistory] = useState(redux_transactions);
  let [pageArray, setPageArray] = useState(["1"]);
  let [temparray, setTemparray] = useState([]);
  let [flag, setFlag] = useState(true);
  let filteredData;
  let sortData;

  let [size,setSize]=useState();
  console.log(size);
  let number_of_pages = Math.round(redux_transactions.length / 2);
  console.log(number_of_pages);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(history({ redux_userId: redux_userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(redux_transactions);
    console.log("number of pages: " + number_of_pages);
    if (number_of_pages === 0) {
      setPageArray(["1"]);
    } else {
      let newpageArray = [];
      for (let i = 0; i < number_of_pages; i++) {
        newpageArray.push("" + (i + 1));
      }
      setPageArray(newpageArray);
    }
    console.log(pageArray);
    var i, j;
    let newtemparray = [];
    for (i = 0, j = redux_transactions.length; i < j; i += 2) {
      newtemparray.push(redux_transactions.slice(i, i + 2));
      setTemparray(newtemparray);
    }
  }, []);

  const sizeFilter = () => {
    setSize(parseInt(document.getElementById("size").value));
    console.log(size);
    number_of_pages = Math.round(redux_transactions.length / size);

    if (number_of_pages === 0) {
      setPageArray(["1"]);
    } else {
      let newpageArray = [];
      for (let i = 0; i < number_of_pages; i++) {
        newpageArray.push("" + (i + 1));
      }
      setPageArray(newpageArray);
    }
    console.log("page array: ")
    console.log(pageArray);
    var i, j;
    let newtemparray = [];
    for (i = 0, j = redux_transactions.length; i < j; i += size) {
      newtemparray.push(redux_transactions.slice(i, i + size));
      setTemparray(newtemparray);
    }
    console.log(temparray);
    // pageClick({target:{dataset:{id:0}}})
  };

  const pageClick = (e) => {
    console.log(e);
    const pageNumber = parseInt(e.target.dataset.id);
    console.log(pageNumber);
    setFilteredHistory(temparray[pageNumber]);
    console.log(temparray);
  };

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
      console.log(filterTerm);
      filteredData = redux_transactions.filter(
        (element) => element.group === filterTerm
      );
      // redux_transactions = filteredData;
      console.log(filteredData.length);
      if(filteredData.length>0){
        setFilteredHistory(filteredData);
        setFlag(true)
      }else{
        setFilteredHistory(filteredData);
        setFlag(false)
      }
      
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
        </select>{" "}
        <select onChange={sizeFilter} id="size">
          <option>2</option>
          <option>5</option>
          <option>10</option>
        </select>{" "}
      </div>

      <div>
        {/* filteredHistory.length > 1 || filteredHistory[0].amount */}
        {redux_transactions.length > 0
          ? filteredHistory && filteredHistory.length > 0
            ? filteredHistory.map((transaction, index) =>(
                //renders this on any filters being set
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
            : flag ? redux_transactions.slice(0, size?size:2).map((transaction, index) => (
                // defaults here
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
              )):"No transactions found"
          : "No transactions in history"}
      </div>
      <div className="mt-4">
        <Pagination>
          {pageArray
            ? pageArray.map((value, index) => {
              console.log("inside return page array updates to...")
              console.log(pageArray)
              return(
                <Pagination.Item
                  id={index}
                  key={index}
                  onClick={pageClick}
                  data-id={index}
                >
                  {value}
                </Pagination.Item>
              )})
            : ""}
        </Pagination>
      </div>
    </div>
  );
};

export default History;
