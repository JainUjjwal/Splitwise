import React, {useEffect, useState} from "react";
// import SubmitButton from "./SubmitButton";
import { Button, Container, Row, Col } from "react-bootstrap";
import AddBillModal from "./AddBillModal";
import CreateGroupModal from "./CreateGroupModal";
// import Navbar from './Nav2';
// import {selectUser} from "../features/userSlice";
import {useSelector} from "react-redux";

const Dashboard = () => {
  const user = useSelector(state=>state.user);
  const username = user ? user.username : false;
  var [openBillDialog, setOpenBillDialog] = useState(false);
  var [openGroupDialog, setOpenGroupDialog] = useState(false);
  // const user = useSelector(selectUser);
  const GroupDialogOpen = () => {
    setOpenGroupDialog(true);
  };
  const BillDialogOpen = () => {
    setOpenBillDialog(true);
  };
  const dialogClose = () => {
    setOpenBillDialog(false);
    setOpenGroupDialog(false);
  };
  return (
    <div>
    <div className="mt-3 mx-auto">
      <h3 className="container">Welcome {username}</h3>
      <Container fluid="md"  style={{ marginLeft: "65%" }}>
      
        <div className="btn-group mx2">
          <Button onClick={GroupDialogOpen}>Create Group</Button>
          <Button variant="danger" onClick={BillDialogOpen}>
            Add Expense
          </Button>
          <Button variant="success">Settle up!</Button>
        </div>
      </Container>
      <AddBillModal show={openBillDialog} hide={dialogClose} />
      <CreateGroupModal show={openGroupDialog} hide={dialogClose} />
      <Container className="mt-3">
        <div
          style={{
            fontSize: 14,
            color: "grey",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              padding: "0px 50px",
              borderRight: "1px solid #9e9e9e",
              borderLeft: "1px solid #9e9e9e",
              justifyContent: "space-around",
              textAlign: "center",
            }}
          >you owe <br />
            <span style={{ lineHeight: "25px", color: "red" }}> $ 50</span>
          </div>
          <div
            style={{
              padding: "0px 50px",
              borderRight: "1px solid #9e9e9e",
              justifyContent: "space-around",
              textAlign: "center",
            }}
          > you are owed <br />
            <span style={{ lineHeight: "25px", color: "Green" }}>$ 200</span>
          </div>
        </div>
      </Container>
      <Container id="user-holder" className="mt-4">
      <div id="table-title" className='pb-4'>
          <Row className="text-center">
            <Col id="name" ><b>User</b></Col>
            <Col id="group-name" className="border-left border-right"><b>Group Name</b></Col>
            <Col id="amount"><b>Amount</b></Col>
          </Row>
        </div>
        <div id="user-1" className='pb-4'>
          <Row className="text-center">
            <Col id="name" >Ujjwal</Col>
            <Col id="group-name" className="border-left border-right">House</Col>
            <Col id="amount">$30</Col>
          </Row>
        </div>
        <div id="user-2">
          <Row className="text-center">
            <Col id="name" >Mohit</Col>
            <Col id="group-name" className="border-left border-right">House</Col>
            <Col id="amount">$50</Col>
          </Row>
        </div>
      </Container>
    </div>
    </div>
  );
};

export default Dashboard;
