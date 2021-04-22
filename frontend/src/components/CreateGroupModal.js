import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormInput from "./FormInput";
import { useDispatch, useSelector } from "react-redux";
import {createGroup} from "../reducers/GroupReducer"
const CreateGroupModal = (props) => {
  const redux_user = useSelector((state)=>state.user)
  const currentUser = redux_user?redux_user.userId:false
  const [groupName, setGroupName] = useState("");
  const [addedFriend, setAddedFriend] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(props.show);
  const dispatch = useDispatch();
  const searchTermHandler = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  let removeKey = -1;
  const addFriend = (e) => {
    if (show) {
    } //just removing eslint warning for no-unused-vars
    let key = e.target.dataset.id
    console.log(key)
    props.friends.forEach((element, index) => {
      
      if (element._id === key) {
        // console.log(element.userId)
        setAddedFriend([
          ...addedFriend,
          {
            userId: element._id,
            username: element.username,
            Fname: element.Fname,
          },
        ]);
        removeKey = index;
      }
    });
    props.friends.splice(removeKey, 1);
  };

  const removeFriend = (e) => {
    let key = e.target.dataset.id;
    console.log(key)
    addedFriend.forEach((element, index) => {
      console.log(element)
      if (element.userId === key) {
        props.friends.push(element);
        removeKey = index;
        console.log("element: " + element)
        console.log("removing key "+removeKey)
      }
    });
    let newList = [...addedFriend];
    console.log("newList element to splice: "+ newList[removeKey])
    newList.splice(removeKey, 1);
    setAddedFriend(newList);
  };
  const createGroupFunction = async () => {
    dispatch(createGroup({addedFriend: addedFriend, groupName: groupName, currentUser: currentUser}))
    setTimeout(closeModal(),2000);
  };
  const closeModal = () => {
    props.friends.push(...addedFriend);
    setAddedFriend([]);
    setShow(props.hide);
  };
  return (
    <Modal show={props.show} onHide={closeModal}>
      {console.log(props.friends)}
      <Modal.Header closeButton>
        <Modal.Title>Create Group.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInput
          id="GroupName"
          text="Group Name"
          type="text"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          required = {true}
        />
        <FormInput
          id="GroupSearch"
          text="Search for Friends"
          type="text"
          onChange={searchTermHandler}
        />
        {searchTerm.length > 0 && props.friends
          ? props.friends.map((friend, index) => {
              return friend.username.search(searchTerm) > -1 ? (
                <div className="mt-4" key={index}>
                  {friend.Fname} ({friend.username}){" "}
                  <Button
                    className="float-right"
                    data-id={friend._id}
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
        {addedFriend && addedFriend.length > 0
          ? addedFriend.map((confirmed, index) => (
              <div className="mt-4" key={index}>
                {confirmed.Fname} ({confirmed.username}){" "}
                {console.log(confirmed)}
                <Button
                  variant="danger"
                  className="float-right"
                  data-id={confirmed.userId}
                  onClick={removeFriend}
                >
                  Remove
                </Button>
              </div>
            ))
          : ""}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="success" onClick={createGroupFunction} disabled={addedFriend.length>0 && groupName? false : true }>
          Create Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;
