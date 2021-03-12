import React, { useEffect, useState } from "react";
// import SubmitButton from "./SubmitButton";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import CreateGroupModal from "./CreateGroupModal";
// import Navbar from './Nav2';
// import {selectUser} from "../features/userSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const username = user ? user.username : false;
  const isLoggedIn = user ? user.isLogged : false;
  var [openGroupDialog, setOpenGroupDialog] = useState(false);
  // DATABLOCK MUST BE UPDATED USING AXIOS CALL
  var dataBlock = [
    { id: "1", name: "Ujjwal", amount: 2000, typeClass: true },
    { id: "2", name: "Mohit", amount: 1000, typeClass: false },
    { id: "3", name: "Shashwat", amount: 15, typeClass: true },
    { id: "4", name: "Ankit", amount: 30, typeClass: false },
  ];
  let friendList = [
    { userId: 1, name: "Ujjwal", email:"ujjwal@gmail.com" },
    { userId: 2, name: "Mohit", email:"mohit@gmail.com" },
    { userId: 3, name: "Ankit", email:"ankit@gmail.com" },
    {userId: 4, name:'Shashwat', email:"shashwat@gmail.com"}
  ];
  let [total, setTotal] = useState();
  var [data, setData] = useState();
  // var userInfo;
  useEffect(() => {
    
    //axios call for updating total balance and settling balance list changes
    axios.post("http://localhost:3001/dashboard").then((res)=>{
       const userInfo = res.data.user;
      //  console.log(userInfo);
    })
    
    let credit = 0;
    let debt = 0;
    if (data) {
      data.forEach((element) => {
        element.typeClass
          ? (credit += element.amount)
          : (debt += element.amount);
      });
    }
    setTotal({ ...total, credit: credit, debt: debt });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    //axios call for setting total balance and balance list
    setData(dataBlock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const GroupDialogOpen = () => {
    setOpenGroupDialog(true);
  };

  const dialogClose = () => {
    setOpenGroupDialog(false);
    
  };
  const settleHandler = (e) => {
    let newData = [...data];
    newData.splice(e.target.dataset.id, 1);
    setData(newData);
  };

  let redirectVar = null;
  if (!isLoggedIn) {
    redirectVar = <Redirect to="/login" />;
  }
  return (
    <div>
      {redirectVar}
      <div className="mt-3 mx-auto">
        <h3 className="container">Welcome {username}</h3>
        <CreateGroupModal show={openGroupDialog} hide={dialogClose} friends={friendList}/>
        <Container className="mt-5">
          <div
            className="row"
            style={{
              fontSize: 14,
              color: "grey",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              className="col"
              style={{
                padding: "0px 50px",
                borderRight: "1px solid #9e9e9e",
                borderLeft: "1px solid #9e9e9e",
                justifyContent: "space-around",
                textAlign: "center",
              }}
            >
              you owe <br />
              <span style={{ lineHeight: "25px", color: "red" }}>
                ${total ? total.debt : ""}
              </span>
            </div>
            <div
              className="col"
              style={{
                padding: "0px 50px",
                borderRight: "1px solid #9e9e9e",
                justifyContent: "space-around",
                textAlign: "center",
              }}
            >
              you are owed <br />
              <span style={{ lineHeight: "25px", color: "Green" }}>
                ${total ? total.credit : ""}
              </span>
            </div>
            <div
              className="col"
              style={{
                padding: "0px 50px",
                borderRight: "1px solid #9e9e9e",
                justifyContent: "space-around",
                textAlign: "center",
              }}
            >
              <Button onClick={GroupDialogOpen}>Create Group</Button>
            </div>
          </div>
        </Container>
        <Container id="user-holder" className="mt-5 pt-4">
          <div id="table-title" className="pb-4">
            <Row className="text-center">
              <Col id="name">
                <b>User</b>
              </Col>
              <Col id="amount" className="border-left border-right">
                <b>Amount</b>
              </Col>
              <Col id="settleButton"></Col>
            </Row>
          </div>

          {/* Rendering individual friend balanceList */}

          {data
            ? data.map((friend, index) => (
                <div id={friend.id} className="pb-4" key={friend.id}>
                  <Row className="text-center">
                    <Col id="name">{friend.name}</Col>
                    <Col
                      id="amount"
                      className="border-left border-right"
                      style={
                        friend.typeClass ? { color: "green" } : { color: "red" }
                      }
                    >
                      ${friend.amount}
                    </Col>
                    <Col id="settleButton">
                      <Button
                        variant="success"
                        onClick={settleHandler}
                        data-id={index}
                      >
                        Settle up!
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))
            : ""}
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
