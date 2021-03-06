import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormInput from "./FormInput";

const CommentModal = (props) => {
  // console.log(props.id)
  console.log('from storage')
  console.log(localStorage.getItem('TransactionId'))
  let [buttonState, setButtonState] = useState(true);
  const disableCheck = () => {
    if (document.getElementById("comment").value.length > 0) {
      setButtonState(false);
    }
  };
  const addComment = () => {
    let comment = document.getElementById("comment").value;
    props.comments.push({userId: props.userId,Fname:props.Fname,commentText:comment, timeposted: "now"})
    props.sendComment(comment,localStorage.getItem('TransactionId'));
  };
  return (
    <Modal show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        {props.comments.length > 0
          ? props.comments.map((commentInfo, index) => (
              <div
                key={index}
                style={{
                  marginLeft: "15px",
                  border: "1px",
                  backgroundColor: "#f0f0f0",
                  padding: "10px 25px ",
                  marginBottom: "2px",
                }}
              >
                <b>{commentInfo.userId? commentInfo.userId === props.userId?'You : ':commentInfo.Fname + ' : ' : ''} </b> {commentInfo.commentText}{" "}
                <i style={{ color: "grey", float: "right" }}>{commentInfo.timeposted}</i>
              </div>
            ))
          :  (
                <div
                  style={{
                    marginLeft: "15px",
                    border: "1px",
                    backgroundColor: "#f0f0f0",
                    padding: "10px 25px ",
                    marginBottom: "2px",
                  }}
                >
                  {props.comments === false
                    ? "No comments on this transaction"
                    : props.comments.commentText}
                </div>
              )}

        <FormInput
          id="comment"
          text="Add a Comment"
          type="text"
          onChange={disableCheck}
        />
        <Button
          variant="success"
          style={{ marginLeft: "15px" }}
          onClick={addComment}
          disabled={buttonState}
        >
          Save
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
