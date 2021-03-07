import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import Navbar from "./Nav2";
const MyGroups = () => {
  return (
      <div> 
        <Navbar />
    <div className="container">
      <div className="my-4">
        <h2>My Groups</h2>
      </div>
      <div>
          <FormInput id='GroupSearch' text='Search for Group' type='text'/>
          <Button type="Submit" className="form-group" style={{marginLeft:"15px"}}>Search</Button>
      </div>
      <Row className="pt-4">
        <Col xs={9} className="border-right">
          <b>Group Name</b>
        </Col>
        <Col className="text-center">
          <b>Action</b>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col xs={9} className="border-right">
        <Link to='/groupPage'>New Group</Link>
        </Col>
        <Col>
          <div className="btn-group mx2">
            <Button variant="success">Accept</Button>
            <Button variant="danger">Decline</Button>
          </div>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col xs={9} className="border-right">
        <Link to='/groupPage'>New Group</Link>
        </Col>
        <Col>
          <div className="btn-group mx2">
            <Button variant="success">Accept</Button>
            <Button variant="danger">Decline</Button>
          </div>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col xs={9} className="border-right">
        <Link to='/groupPage'>New Group</Link>
        </Col>
        <Col>
          <div className="btn-group mx2">
            <Button variant="success">Accept</Button>
            <Button variant="danger">Decline</Button>
          </div>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col xs={9} className="border-right">
        <Link to='/groupPage'>New Group</Link>
        </Col>
        <Col>
          <div className="btn-group mx2">
            <Button variant="success">Accept</Button>
            <Button variant="danger">Decline</Button>
          </div>
        </Col>
      </Row>
    </div>
    </div>
  );
};

export default MyGroups;
