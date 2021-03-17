import React, { useState } from "react";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import FormInput from "./FormInput";
const CreateGroupModal = (props) => {
  const [groupName, setGroupName]=useState("");
  const [addedFriend, setAddedFriend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(props.show);
  const searchTermHandler = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  let removeKey = -1
  const addFriend = (e) => {
    if(show){}//just removing eslint warning for no-unused-vars
    let key = parseInt(e.target.dataset.id);
    props.friends.forEach((element, index) => {
      if (element.userId === key) {
        setAddedFriend([
          ...addedFriend,
          {
            userId: element.userId,
            username: element.username,
            Fname: element.Fname,
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
  const createGroupFunction = () => {
    axios.post("http://localhost:3001/createGroup",{addedFriend, groupName}).then((res,req)=>{
      //ADD CONFIRMATION ON GROUP CREATION
      alert('Group created!')
    })
    setShow(props.hide);
  };
  const closeModal = () =>{
    props.friends.push(...addedFriend)
    setAddedFriend([]);
    setShow(props.hide);
  }
  return (
    <Modal show={props.show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Group.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInput id="GroupName" text="Group Name" type="text" onChange={(e)=>{setGroupName(e.target.value)}}/>
        <FormInput
          id="GroupSearch"
          text="Search for Friends"
          type="text"
          onChange={searchTermHandler}
        />
        {searchTerm.length > 0 && props.friends
          ? props.friends.map((friend, index) => {
              return friend.Fname.search(searchTerm) > -1 ||
                friend.username.search(searchTerm) > -1 ? (
                <div className="mt-4" key={index}>
                  {friend.Fname} ({friend.username}){" "}
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
          {confirmed.Fname} ({confirmed.username}){" "}
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
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="success" onClick={createGroupFunction}>
          Create Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;
