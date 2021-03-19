import React, { useEffect, useState } from "react";
// import SubmitButton from "./SubmitButton";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import CreateGroupModal from "./CreateGroupModal";
// import Navbar from './Nav2';
// import {selectUser} from "../features/userSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const username = user ? user.username : false;
  const userId = user ? user.userId : false;
  const isLoggedIn = user ? user.isLogged : false;
  var [openGroupDialog, setOpenGroupDialog] = useState(false);
  // DATABLOCK MUST BE UPDATED USING AXIOS CALL
  let [total, setTotal] = useState();
  var [data, setData] = useState();
  var [userList, setUserList] = useState();
  let [settleState, setSettleState] = useState();
  // var userInfo;
  useEffect(() => {
    let credit = 0;
    let debt = 0;
    if (data) {
      Object.values(data).forEach((element) => {
        element.typeClass
          ? (credit += element.amount)
          : (debt += element.amount);
      });
    }
    setTotal({ ...total, credit: credit, debt: Math.abs(debt) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  let getDashboardData = async () => {
    await axios
      .get("/dashboard", {
        params: { username: username, userId:userId },
      })
      .then((res) => {
        //Getting list of users to pass to create group modal
        if (res.data.message === "User Info not found") {
          console.log("no users in the database");
        } else {
          setUserList(res.data.userList);
          setData(res.data.dataBlock);
        }
      });
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //axios call for updating total balance and settling balance list changes
    getDashboardData();
  }, []);
  const openDialog = () => {
    setOpenGroupDialog(true);
  };

  const dialogClose = () => {
    setOpenGroupDialog(false);
  };
  const settleHandler = async (e) => {
    // let newData = {...data};
    let deletionId = e.target.dataset.id;
    // console.log(deletionId);
    // delete newData[deletionId];

    // // newData.splice(e.target.dataset.id, 1);
    // setData(newData);
    await  axios.post("http://18.144.25.88:3001/settle", { userId:userId, user2: deletionId }).then((res) => {
      if (res.status === 200) {
        setSettleState(true);
        test();
      }
    });
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
        <CreateGroupModal
          show={openGroupDialog}
          hide={dialogClose}
          friends={userList}
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

          {data
            ? Object.entries(data).map(([id, friend], index) => (
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
