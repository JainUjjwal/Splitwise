import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBillModal from "./AddBillModal";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
const GroupPage = (param) => {
  let [groupInfo, setGroupInfo] = useState();
  let [openBillDialog, setOpenBillDialog] = useState(false);
  let [data, setData] = useState();
  var searchParams = new URLSearchParams(param.location.search);
  useEffect(() => {
    //axios call for setting total balance and balance list
    // axios.post("http://localhost:3001/groupPage").then((res)=>{
    // })
    console.log(searchParams.get("id"));
    axios
      .post("http://localhost:3001/groupPage", {
        groupID: searchParams.get("id"),
      })
      .then((response) => {
        setGroupInfo(response.data.dummyInfo);
        setData(response.data.transactionList);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BillDialogOpen = () => {
    setOpenBillDialog(true);
  };
  const dialogClose = () => {
    setOpenBillDialog(false);
  };
  const addBill = (newDiscription, newAmount) => {
    let newdata = [...data];
    newdata.push({
      discription: newDiscription,
      amount: newAmount,
      typeClass: true,
    });
    setData(newdata);
    dialogClose();
    // TRASHY FRONTEND LOGIC FOR UPDATING GROUP MEMBER BALANCE
    // PLEASE UPDATE THIS
    // let perPerson = parseFloat((newAmount/memberList.length).toFixed(2))
    // let members = groupInfo.members;
    // members[1].amount = members[1].amount + perPerson;

    // console.log(groupInfo.members[1].amount + perPerson);
    axios
      .post("http://localhost:3001/addBill", {
        amount: newAmount,
        discription: newDiscription,
        groupId: searchParams.get('id')
      })
      .then((response) => {console.log('sent transaction data to backend')});
  };
  const user = useSelector((state) => state.user);
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
        <div className="col mt-3">
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
            <h2>{groupInfo ? groupInfo.groupName : ""}</h2>
          </div>
          <div className="btn-group mx2">
            <Button variant="success" onClick={BillDialogOpen}>
              Add Expense
            </Button>
            <Button variant="danger">Leave Group</Button>
          </div>
          <div>
            <Row className="pt-4">
              <Col xs={9} className="border-right">
                <b>Description</b>
              </Col>
              <Col>amount</Col>
            </Row>
          </div>
          {data
            ? data.map((friend, index) => (
                <div className="pt-4" key={index}>
                  <Row>
                    <Col xs={9} className="border-right">
                      {friend.discription}
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
