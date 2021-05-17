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

  let [filteredHistory, setFilteredHistory] = useState();
  let [pageArray, setPageArray] = useState();
  let [temparray, setTemparray] = useState([]);
  let [flag, setFlag] = useState(true);
  let filteredData;
  let sortData;

  let [size, setSize] = useState(2);
  
  let number_of_pages = Math.round(redux_transactions.length / size);
  

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(history({ redux_userId: redux_userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    number_of_pages = Math.ceil(redux_transactions.length / size);
    if (number_of_pages === 0) {
      setPageArray(["1"]);
    } else {
      let newpageArray = [];
      for (let i = 0; i < number_of_pages; i++) {
        newpageArray.push("" + (i + 1));
      }
      setPageArray(newpageArray);
    }
    var i, j;
    let newtemparray = [];
    for (i = 0, j = redux_transactions.length; i < j; i += 2) {
      newtemparray.push(redux_transactions.slice(i, i + 2));
      setTemparray(newtemparray);
    }
  }, [redux_transactions]);

  const sizeFilter = (event) => {
    const selectedValueCount = parseInt(event.target.value);
    setSize(selectedValueCount);
    console.log(redux_transactions.length);
    number_of_pages = Math.ceil(redux_transactions.length / selectedValueCount);
    console.log(`selected pages ${number_of_pages}`);
    if (number_of_pages === 0) {
      setPageArray(["1"]);
    } else {
      let newpageArray = [];
      for (let i = 0; i < number_of_pages; i++) {
        newpageArray.push("" + (i + 1));
      }
      setPageArray(newpageArray);
    }
    console.log("page array: ");
    console.log(pageArray);
    var i, j;
    let newtemparray = [];
    for (i = 0, j = redux_transactions.length; i < j; i += selectedValueCount) {
      newtemparray.push(redux_transactions.slice(i, i + selectedValueCount));
    }
    setTemparray(newtemparray);
    setFilteredHistory(newtemparray[0]);
    console.log(newtemparray);
    // pageClick({target:{dataset:{id:0}}})
  };

  const pageClick = (e) => {
    console.log(e);
    const pageNumber = parseInt(e.target.dataset.id);
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
    var i, j;
    if (filterTerm === "All Groups") {
      number_of_pages = Math.ceil(redux_transactions.length / size);
      let newpageArray = [];
      for (let i = 0; i < number_of_pages; i++) {
        newpageArray.push("" + (i + 1));
      }
      setPageArray(newpageArray);
      let newtemparray = [];
      for (i = 0, j = redux_transactions.length; i < j; i += size) {
        newtemparray.push(redux_transactions.slice(i, i + size));
      }
      setTemparray(newtemparray);
      setFilteredHistory(newtemparray[0]);
    } else {
      console.log(temparray);
      filteredData = redux_transactions.filter(
        (element) => element.group === filterTerm
      );
      // redux_transactions = filteredData;
      if (filteredData.length > 0) {
        number_of_pages = Math.ceil(filteredData.length / size);
        let newpageArray = [];
        for (let i = 0; i < number_of_pages; i++) {
          newpageArray.push("" + (i + 1));
        }
        setPageArray(newpageArray);

        let newtemparray = [];
        for (i = 0, j = filteredData.length; i < j; i += size) {
          newtemparray.push(filteredData.slice(i, i + size));
        }
        setTemparray(newtemparray);
        setFilteredHistory(newtemparray[0]);
        // setFilteredHistory(filteredData);
        setFlag(true);
      } else {
        setFilteredHistory(filteredData);
        setFlag(false);
        setPageArray([]);
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
      {/* {redirectVar} */}
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
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>{" "}
      </div>

      <div>
        {/* filteredHistory.length > 1 || filteredHistory[0].amount */}
        {redux_transactions.length > 0
          ? filteredHistory && filteredHistory.length > 0
            ? filteredHistory.map((transaction, index) => (
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
            : flag
            ? redux_transactions
                .slice(0, size ? size : 2)
                .map((transaction, index) => (
                  // defaults here
                  <div key={index} className="row pt-4">
                    <div className="col">
                      {transaction.payer} added{" "}
                      <b>"{transaction.discription}"</b> in{" "}
                      <b>"{transaction.group}"</b> at {transaction.timeStamp}
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
            : "No transactions found"
          : "No transactions in history"}
      </div>
      <div className="mt-4">
        <Pagination>
          {pageArray
            ? pageArray.map((value, index) => {
                return (
                  <Pagination.Item
                    id={index}
                    key={index}
                    onClick={pageClick}
                    data-id={index}
                  >
                    {value}
                  </Pagination.Item>
                );
              })
            : ""}
        </Pagination>
      </div>
    </div>
  );
};

export default History;
