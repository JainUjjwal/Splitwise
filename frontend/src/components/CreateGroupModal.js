import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormInput from "./FormInput";
const CreateGroupModal = (props) => {
  const [groupName, setGroupName]=useState("");
  const [addedFriend, setAddedFriend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermHandler = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  let removeKey = -1
  const addFriend = (e) => {
    let key = parseInt(e.target.dataset.id);
    props.friends.forEach((element, index) => {
      if (element.userId === key) {
        setAddedFriend([
          ...addedFriend,
          {
            userId: element.userId,
            email: element.email,
            name: element.name,
          },
        ]) ;
        removeKey=index;
      }
    });
    props.friends.splice(removeKey, 1);
  };

  const removeFriend = (e) => {
    let key = parseInt(e.target.dataset.id);
    addedFriend.forEach((element,index)=>{
      if (element.userId === key){
        props.friends.push(element);
        removeKey = index;
      }
    })
    let newList = [...addedFriend]
    newList.splice(removeKey, 1);
    setAddedFriend(newList);
  };
  const randomFunction = () => {
    console.log(groupName);
  };
  return (
    <Modal show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add an expense.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInput id="GroupName" text="Group Name" type="text" onChange={(e)=>{setGroupName(e)}}/>
        <FormInput
          id="GroupSearch"
          text="Search for Friends"
          type="text"
          onChange={searchTermHandler}
        />
        {searchTerm.length > 0 && props.friends
          ? props.friends.map((friend, index) => {
              return friend.name.search(searchTerm) > -1 ||
                friend.email.search(searchTerm) > -1 ? (
                <div className="mt-4" key={index}>
                  {friend.name} ({friend.email}){" "}
                  <Button
                    className="float-right"
                    data-id={friend.userId}
                    onClick={addFriend}
                  >
                    Add
                  </Button>
                </div>
              ) : (
                ""
              );
            })
          : ""}
        {addedFriend&&addedFriend.length > 0
          ? addedFriend.map((confirmed, index) => <div className="mt-4" key={index}>
          {confirmed.name} ({confirmed.email}){" "}
          <Button
            variant="danger"
            className="float-right"
            data-id={confirmed.userId}
            onClick={removeFriend}
          >
            Remove
          </Button>
        </div>)
          : ""}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Close
        </Button>
        <Button variant="success" onClick={randomFunction}>
          Create Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;
