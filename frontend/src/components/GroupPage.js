import React, { useState, useEffect } from "react";
import AddBillModal from "./AddBillModal";
import { Button, Row, Col } from "react-bootstrap";
const GroupPage = () => {
  let transactionList = [
    { discription: "Rent", amount: 2000, typeClass: true },
    { discription: "Trip", amount: 1000, typeClass: false },
    { discription: "Food", amount: 15, typeClass: true },
    { discription: "Drinks", amount: 15, typeClass: false },
  ];
  const memberList = [
    { name: "Ujjwal", amount: 1000, status: true },
    { name: "Pavan", amount: 500, status: false },
    { name: "Shubham", amount: 500, status: false },
  ];
  let dummyInfo = { groupName: "House", members: memberList };
  let [groupInfo, setGroupInfo] = useState();
  let [openBillDialog, setOpenBillDialog] = useState(false);
  let [data, setData] = useState();
  useEffect(() => {
    //axios call for setting total balance and balance list
    setGroupInfo(dummyInfo);
    setData(transactionList);
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

    // TRASHY FRONTEND LOGIC FOR UPDATING GROUP MEMBER BALANCE 
    // PLEASE UPDATE THIS 
    let perPerson = parseFloat((newAmount/memberList.length).toFixed(2))
    let members = groupInfo.members;
    members[1].amount = members[1].amount + perPerson;

    console.log(groupInfo.members[1].amount + perPerson);
    

  };
  return (
    <div className="container-fluid">
      <div className="row">
        {/* DISPLAYING AMOUNT FOR EACH GROUP MEMBER */}
        {/* ######################### */}
        <div className="col mt-3">
          {groupInfo?groupInfo.members.map((member,index)=>(
             <div className='my-4' key={index}>
             {member.name} : <span  style={
                        member.status ? { color: "green" } : { color: "red" }
                      }>${member.amount}</span><br />
           </div>  
          )):''}
        </div>
        <div className="col-lg-9">
          <AddBillModal
            show={openBillDialog}
            hide={dialogClose}
            onBillSubmit={addBill}
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
