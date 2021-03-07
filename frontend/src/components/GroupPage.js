import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import Navbar from "./Nav2";
const GroupPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="my-4">
          <h2>Group Name</h2>
        </div>
        <div className="btn-group mx2">
          <Button variant="danger">Add Expense</Button>
        </div>
        <Row className="pt-4">
          <Col xs={9} className="border-right">
            <b>Description</b>
          </Col>
          <Col>amount</Col>
        </Row>
        <Row className="pt-4">
          <Col xs={9} className="border-right">
            Bill
          </Col>
          <Col>$ XX.X</Col>
        </Row>
      </div>
    </div>
  );
};

export default GroupPage;
