import React, { useEffect, useState } from "react";
// import SubmitButton from "./SubmitButton";
import { Button, Container, Row, Col } from "react-bootstrap";
import AddBillModal from "./AddBillModal";
import CreateGroupModal from "./CreateGroupModal";
// import Navbar from './Nav2';
// import {selectUser} from "../features/userSlice";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const username = user ? user.username : false;
  var [openBillDialog, setOpenBillDialog] = useState(false);
  var [openGroupDialog, setOpenGroupDialog] = useState(false);
  // DATABLOCK MUST BE UPDATED USING AXIOS CALL
  var dataBlock = [
    { id: "1", name: "Ujjwal", amount: 2000, typeClass: true },
    { id: "2", name: "Mohit", amount: 1000, typeClass: false },
    { id: "3", name: "Shashwat", amount: 15, typeClass: true },
    { id: "4", name: "Ankit", amount: 30, typeClass: false },
  ];
  let [total, setTotal] = useState();
  var [data, setData] = useState();
  useEffect(() => {
    //axios call for updating total balance and settling balance list changes
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
  }, [data]);
  useEffect(() => {
    //axios call for setting total balance and balance list
    setData(dataBlock);
    console.log("second use");
  }, []);
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
  const settleHandler = (e) => {
    let newData = [...data];
    newData.splice(e.target.dataset.id, 1);
    setData(newData);
  };
  return (
    <div>
      <div className="mt-3 mx-auto">
        <h3 className="container">Welcome {username}</h3>
        <Container fluid="md" style={{ marginLeft: "65%" }}>
          <div className="btn-group mx2"></div>
        </Container>
        <AddBillModal show={openBillDialog} hide={dialogClose} />
        <CreateGroupModal show={openGroupDialog} hide={dialogClose} />
        <Container className="mt-3">
          <div className='row'
            style={{
              fontSize: 14,
              color: "grey",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div className="col"
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
            <div className="col"
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
            <div className="col"
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
        <Container id="user-holder" className="mt-4">
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
