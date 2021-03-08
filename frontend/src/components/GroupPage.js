import React, { useState, useEffect } from "react";
import AddBillModal from "./AddBillModal";
import { Button, Row, Col } from "react-bootstrap";
const GroupPage = () => {
  let [groupInfo, setGroupInfo] = useState();
  let transactionList = [
    { id: "1", discription: "Rent", amount: 2000, typeClass: true },
    { id: "2", discription: "Trip", amount: 1000, typeClass: false },
    { id: "3", discription: "Food", amount: 15, typeClass: true },
    { id: "4", discription: "Drinks", amount: 30, typeClass: false },
  ];
  var [openBillDialog, setOpenBillDialog] = useState(false);
  let [data, setData] = useState();
  useEffect(() => {
    //axios call for setting total balance and balance list
    setData(transactionList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BillDialogOpen = () => {
    console.log('check');
    setOpenBillDialog(true);
  };
  const dialogClose = () => {
    setOpenBillDialog(false);
  };
  return (
    <div>
      <div className="container">
      <AddBillModal show={openBillDialog} hide={dialogClose} />
        <div className="my-4">
          <h2>Group Name</h2>
        </div>
        <div className="btn-group mx2">
          <Button variant="danger" onClick={BillDialogOpen}>Add Expense</Button>
        </div>
        <div>
          <Row className="pt-4">
            <Col xs={9} className="border-right">
              <b>Description</b>
            </Col>
            <Col>amount</Col>
          </Row>
        </div>
          {data ? data.map((friend, index) => (
              <div className="pt-4">
                <Row>
                  <Col xs={9} className="border-right">
                    {friend.discription}
                  </Col>
                  <Col style={
                        friend.typeClass ? { color: "green" } : { color: "red" }
                      }>${friend.amount}</Col>
                </Row>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default GroupPage;
