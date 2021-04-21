import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import CreateGroupModal from "./CreateGroupModal";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getDashboard, settle } from "../reducers/DashboardReducer";
const util = require("../reducers/utilities");

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const username = user ? user.username : false;
  const Fname = user ? user.Fname : false;
  const userId = user ? user.userId : false;
  const isLoggedIn = user ? user.isLogged : false;
  
  // Dashboard Data getter
  const dashboardData = useSelector((state)=>state.dashboard)
  const redux_data = dashboardData? dashboardData.balance : false;
  const redux_userList = dashboardData ? dashboardData.friendList : false;
  
  var [openGroupDialog, setOpenGroupDialog] = useState(false);
  // DATABLOCK MUST BE UPDATED USING AXIOS CALL
  let [total, setTotal] = useState();
  let [settleState, setSettleState] = useState();
  const dispatch = useDispatch();
  // var userInfo;
  useEffect(() => {
    let credit = 0;
    let debt = 0;
    if (redux_data) {
      Object.values(redux_data).forEach((element) => {
        element.typeClass
          ? (credit += element.amount)
          : (debt += element.amount);
      });
    }
    setTotal({ ...total, credit: credit, debt: Math.abs(debt) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux_data]);

  useEffect(() => {
    dispatch(getDashboard({ username: username, userId: userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDialog = () => {
    setOpenGroupDialog(true);
  };

  const dialogClose = () => {
    setOpenGroupDialog(false);
  };

  const settleHandler = async (e) => {
    let deletionId = e.target.dataset.id;
    dispatch(settle({userId: userId, deletionId: deletionId}))
    setSettleState(true);
  };
  let newIsLogged = util.isLoggedIn()
  let redirectVar = null;
  console.log(util.isLoggedIn());
  if (!util.isLoggedIn()) {
    redirectVar = <Redirect to="/login" />;
  }

  return (
    <div>
      {redirectVar}
      <div className="mt-3 mx-auto">
        <h3 className="container">Welcome {Fname}</h3>
        <CreateGroupModal
          show={openGroupDialog}
          hide={dialogClose}
          friends={redux_userList}
        />
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
              <Button onClick={openDialog}>Create Group</Button>
            </div>
          </div>
        </Container>
        <Container id="user-holder" className="mt-5 pt-4">
          {settleState ? (
            <div className="alert alert-success"> Settled Up! </div>
          ) : (
            ""
          )}
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

          {redux_data
            ? Object.entries(redux_data).map(([id, friend], index) => (
                <div id={id} className="pb-4" key={id}>
                  <Row className="text-center">
                    <Col id="name">{friend.Fname}</Col>
                    <Col
                      id="amount"
                      className="border-left border-right"
                      style={
                        friend.typeClass ? { color: "green" } : { color: "red" }
                      }
                    >
                      ${Math.abs(friend.amount)}
                    </Col>

                    <Col id="settleButton">
                      <Button
                        variant="success"
                        onClick={settleHandler}
                        data-id={id}
                        disabled={Math.abs(friend.amount) === 0 ? true : false}
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
