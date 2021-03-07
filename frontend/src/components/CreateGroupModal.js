import React from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import FormInput from "./FormInput";
const CreateGroupModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add an expense.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInput id="GroupSearch" text="Search for Friends" type="text" />
        <Button
          type="Submit"
          className="form-group"
          style={{ marginLeft: "15px" }}
        >
          Add
        </Button>
        
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

export default CreateGroupModal;
