import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormInput from "./FormInput";

const AddBillModal = (props) => {
  let [amount, setAmount] = useState();
  let [discription, setDiscription] = useState();
  let [disableButton, setDisableButton] = useState(true);
  const addNewBill = () =>{
    props.onBillSubmit(discription, amount);
  }
  const disableCheck=()=>{
    
    let disc = document.getElementById('discription').value;
    let money = document.getElementById('amount').value;
    setAmount(money);
    setDiscription(disc);
    if (disc.length > 0 && money.length>0){
      setDisableButton(false)
    }
  }
  return (
    <Modal show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add an expense.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br />
        <FormInput id="discription" text="Discription" type="text" onChange = {disableCheck}/>
        <FormInput id="amount" text="Amount" type="number" onChange ={disableCheck}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Close
        </Button>
        <Button variant="success" onClick={addNewBill} disabled={disableButton}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBillModal;
