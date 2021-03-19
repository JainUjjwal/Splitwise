import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBillModal from "./AddBillModal";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
const GroupPage = (param) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const currentUser = user ? user.userId : false;
  let [groupInfo, setGroupInfo] = useState();
  let [openBillDialog, setOpenBillDialog] = useState(false);
  let [editStatus, setEditStatus] = useState(false);
  let [data, setData] = useState();
  var searchParams = new URLSearchParams(param.location.search);
  const dataSetter = async () => {
    await axios
      .post("http://18.144.25.88:3001/groupPage", {
        groupID: searchParams.get("id"),
        userId: currentUser,
      })
      .then((response) => {
        setGroupInfo(response.data.dummyInfo);
        setData(response.data.transactionList);
      });
  };
  useEffect(() => {
    dataSetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BillDialogOpen = () => {
    setOpenBillDialog(true);
  };
  const dialogClose = () => {
    setOpenBillDialog(false);
  };
  const addBill = async (newDiscription, newAmount) => {
    await axios
      .post("http://18.144.25.88:3001/addBill", {
        amount: newAmount,
        discription: newDiscription,
        groupId: searchParams.get("id"),
        userId: currentUser,
      })
      .then((response) => {
        if (response.status === 201) {
          let newdata = [...data];
          newdata.push({
            discription: newDiscription,
            amount: newAmount,
            typeClass: true,
          });
          setData(newdata);
          dialogClose();
          dataSetter();
        }
      });
  };

  //Redirection to login if redux state not set

  const isLoggedIn = user ? user.isLogged : false;
  let redirectVar = null;
  if (!isLoggedIn) {
    redirectVar = <Redirect to="/login" />;
  }

  const LeaveGroupHandler = async () => {
    const groupId = searchParams.get("id");
    await axios
      .post("http://18.144.25.88:3001/leaveGroup", {
        groupId: groupId,
        userId: currentUser,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
          history.push("/mygroups");
          setGroupInfo("");
        }
        if (response.status === 202) {
          alert(response.data.message);
        }
      });
  };

  const saveGroupName = async () => {
    const groupId = searchParams.get("id");
    const groupName = document.getElementById("newGroupName").value;
    await axios
      .post("http://18.144.25.88:3001/updateGroup", {
        groupId: groupId,
        groupName: groupName,
        userId: currentUser,
      })
      .then((response) => {
        if (response.status === 201) {
          setEditStatus(false);
          dataSetter();
        }
      });
  };

  const editGroup = () => {
    setEditStatus(true);
  };

  return (
    <div className="container-fluid">
      {redirectVar}
      <div className="row">
        {/* DISPLAYING AMOUNT FOR EACH GROUP MEMBER */}
        {/* ######################### */}
        <div className="col mt-4">
          <h3 className="">User Balance</h3>
          {groupInfo
            ? groupInfo.members.map((member, index) => (
                <div className="my-4" key={index}>
                  {member.name} :{" "}
                  <span
                    style={
                      member.status ? { color: "green" } : { color: "red" }
                    }
                  >
                    ${member.amount}
                  </span>
                  <br />
                </div>
              ))
            : ""}
        </div>
        <div className="col-lg-9">
          <AddBillModal
            show={openBillDialog}
            hide={dialogClose}
            onBillSubmit={addBill}
            groupID={searchParams.get("id")}
          />
          <div className="my-4">
            {editStatus ? (
              <div>
                <input
                  type="text"
                  id="newGroupName"
                  defaultValue={groupInfo ? groupInfo.groupName : ""}
                ></input>
              </div>
            ) : (
              <div>
                <h2>{groupInfo ? groupInfo.groupName : ""}</h2>
              </div>
            )}
            {/* <h2>{groupInfo ? groupInfo.groupName : ""}</h2> */}
          </div>
          <div className="btn-group mx2">
            <Button variant="success" onClick={BillDialogOpen}>
              Add Expense
            </Button>
            {editStatus ? (
              <span className="btn-group mx2">
                <Button onClick={saveGroupName} type="submit">
                  Save Edit
                </Button>
                <Button onClick={() => setEditStatus(false)}>
                  Discard Edit
                </Button>
              </span>
            ) : (
              <Button onClick={editGroup}>Edit Group</Button>
            )}
            <Button variant="danger" onClick={LeaveGroupHandler}>
              Leave Group
            </Button>
          </div>
          <div>
            <Row className="pt-4">
              <Col xs={9} className="border-right">
                <b>Description</b>
              </Col>
              <Col>Total Amount</Col>
            </Row>
          </div>
          {data
            ? data.map((friend, index) => (
                <div className="pt-4" key={index}>
                  <Row>
                    <Col xs={9} className="border-right">
                      <b>{friend.discription}</b> paid by{" "}
                      <b>
                        <i>{friend.Fname}</i>
                      </b>{" "}
                      at <span style={{ color: "grey" }}>{friend.ts}</span>
                    </Col>
                    <Col
                      style={
                        friend.typeClass ? { color: "green" } : { color: "red" }
                      }
                    >
                      ${friend.amount}
                    </Col>
                  </Row>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
