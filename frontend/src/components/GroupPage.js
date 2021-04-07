import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBillModal from "./AddBillModal";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {
  editGroupName,
  getGroupPageInfo,
  addExpense,
  leaveGroup,
} from "../reducers/GroupPageReducer";
const GroupPage = (param) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const currentUser = user ? user.userId : false;
  const redux_groupPage = useSelector((state) => state.groupPage);
  const redux_groupInfo = redux_groupPage ? redux_groupPage.groupInfo : false;
  const redux_data = redux_groupPage ? redux_groupPage.data : false;
  let [groupInfo, setGroupInfo] = useState();
  let [openBillDialog, setOpenBillDialog] = useState(false);
  let [editStatus, setEditStatus] = useState(false);
  let [data, setData] = useState();
  const dispatch = useDispatch();
  var searchParams = new URLSearchParams(param.location.search);
  const groupId = searchParams.get("id");
  useEffect(() => {
    // dataSetter();
    dispatch(getGroupPageInfo({ userId: currentUser, groupID: groupId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BillDialogOpen = () => {
    setOpenBillDialog(true);
  };
  const dialogClose = () => {
    setOpenBillDialog(false);
  };
  const addBill = async (newDiscription, newAmount) => {
    dispatch(
      addExpense({
        newAmount: newAmount,
        newDiscription: newDiscription,
        currentUser: currentUser,
        groupId: groupId,
      })
    ).then(() => {
      dialogClose();
    });
  };

  const LeaveGroupHandler = async () => {
    dispatch(leaveGroup({ currentUser: currentUser, groupId: groupId })).then(
      () => {
        history.push("/mygroups");
      }
    );
  };

  const saveGroupName = async () => {
    const groupName = document.getElementById("newGroupName").value;
    dispatch(
      editGroupName({
        currentUser: currentUser,
        groupName: groupName,
        groupId: groupId,
      })
    ).then(() => {
      setEditStatus(false);
    });
  };

  const editGroup = () => {
    setEditStatus(true);
  };
  //Redirection to login if redux state not set
  const isLoggedIn = user ? user.isLogged : false;
  let redirectVar = null;
  if (!isLoggedIn) {
    redirectVar = <Redirect to="/login" />;
  }
  return (
    <div className="container-fluid">
      {redirectVar}
      <div className="row">
        {/* DISPLAYING AMOUNT FOR EACH GROUP MEMBER */}
        {/* ######################### */}
        <div className="col mt-4">
          <h3 className="">User Balance</h3>
          {redux_groupInfo
            ? redux_groupInfo.members.map((member, index) => (
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
            groupID={groupId}
          />
          <div className="my-4">
            {editStatus ? (
              <div>
                <input
                  type="text"
                  id="newGroupName"
                  defaultValue={
                    redux_groupInfo ? redux_groupInfo.groupName : ""
                  }
                ></input>
              </div>
            ) : (
              <div>
                <h2>{redux_groupInfo ? redux_groupInfo.groupName : ""}</h2>
              </div>
            )}
          </div>
          <div className="btn-group mx2">
            <Button
              variant="success"
              onClick={BillDialogOpen}
              disabled={editStatus}
            >
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
            <Button
              variant="danger"
              onClick={LeaveGroupHandler}
              disabled={editStatus}
            >
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
          {redux_data
            ? redux_data.map((friend, index) => (
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
