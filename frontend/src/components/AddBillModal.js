import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormInput from "./FormInput";

const AddBillModal = (props) => {
  let [amount, setAmount] = useState();
  let [discription, setDiscription] = useState();
  const addNewBill = () =>{
    props.onBillSubmit(discription, amount);
  }
  return (
    <Modal show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add an expense.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br />
        <FormInput id="discription" text="Discription" type="text" onChange = {(e)=>{setDiscription(e.target.value)}}/>
        <FormInput id="amount" text="Amount" type="number" onChange = {(e)=>{setAmount(e.target.value)}}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Close
        </Button>
        <Button variant="success" onClick={addNewBill}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBillModal;
