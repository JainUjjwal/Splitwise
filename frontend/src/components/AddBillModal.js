import React from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import FormInput from "./FormInput";

const AddBillModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add an expense.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown class="col-sm">
          <Dropdown.Toggle id="dropdown-basic">Group</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={props.hide}>Group 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Group 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Group 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <FormInput id="discription" text="Discription" type="text" />
        <FormInput id="amount" text="Amount" type="number" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Close
        </Button>
        <Button variant="success" onClick={props.hide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBillModal;
