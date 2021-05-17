import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import FormInput from "./FormInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupInfo,
  getInviteInfo,
  groupRejection,
  groupAcception,
} from "../reducers/GroupReducer";

const MyGroups = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const redux_userId = user ? user.userId : false;

  // Getting data from the redux store and storing them in react states.
  const redux_groupInfo = useSelector((state) => state.groupInfo);
  let redux_inviteList = redux_groupInfo ? redux_groupInfo.invites : false;
  const redux_groupList = redux_groupInfo ? redux_groupInfo.groups : false;

  // const [inviteList, setInviteList] = useState(redux_inviteList);
  // const [groupList, setGroupList] = useState(redux_groupList);
  const [searchTerm, setSearchTerm] = useState("");
  const [done, setDone] = useState(false);
  console.log(redux_groupInfo);
  
  useEffect(() => {
    dispatch(getGroupInfo({ userId: redux_userId }));
    dispatch(getInviteInfo({ userId: redux_userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const acceptHandler = async (e) => {
    // Updating group List
    // let newGroupList = [];
    // if (groupList) {
    //   newGroupList = [...groupList];
    // }
    console.log('accept clicked')
    let acceptedGroup = redux_inviteList[e.target.dataset.id];
    dispatch(
      groupAcception({ userId: redux_userId, acceptedGroup: acceptedGroup })
    );
    console.log('accept dispatched')
    redux_inviteList.splice(e.target.dataset.id, 1);
    setDone(!done);
    // Sending invite status to backend
    // await  axios.post("http://localhost:3010/accInvStatus", { acceptedGroup }).then((response) => {
    //   if (response.status === 269) {
    //     newGroupList.push(acceptedGroup);
    //     setGroupList(newGroupList);
    //     // Updating Invite List
    //     let newInviteList = [...inviteList];
    //     newInviteList.splice(e.target.dataset.id, 1);
    //     setInviteList(newInviteList);
    //   }
    // });
  };

  const rejectHandler = async (e) => {
    // Updating Invite List
    const rejectedGroup = redux_inviteList[e.target.dataset.id];
    // Sending invite status to backend
    dispatch(
      groupRejection({ userId: redux_userId, rejectedGroup: rejectedGroup })
    );
    redux_inviteList.splice(e.target.dataset.id, 1);
    setDone(!done);
    // await  axios.post("http://localhost:3010/rejInvStatus", { rejectedGroup }).then((response) => {
    //   if (response.status === 269) {
    //     let newInviteList = [...inviteList];
    //     newInviteList.splice(e.target.dataset.id, 1);
    //     setInviteList(newInviteList);
    //   }
    // });
  };

  const searchTermHandler = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const groupRedirection = async (e) => {
    history.push("/groupPage?id=" + e.target.dataset.id);
  };

  // function to render invites.
  const renderInvites = (listOfInvites) => {
    return listOfInvites
      ? listOfInvites.map((group, index) => (
          <Row className="pt-4" key={index}>
            <Col xs={9} className="border-right">
              <span>{group.groupName}</span>
            </Col>
            <Col>
              <div className="btn-group mx2 ml-4">
                <Button
                  variant="success"
                  onClick={acceptHandler}
                  data-id={index}
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  onClick={rejectHandler}
                  data-id={index}
                >
                  Decline
                </Button>
              </div>
            </Col>
          </Row>
        ))
      : "";
  };

  const util = require("../reducers/utilities");
  let redirectVar = null;
  if (!util.isLoggedIn()) {
    redirectVar = <Redirect to="/login" />;
  }
  
  return (
    <div>
      {redirectVar}
      <div className="container">
        <div className="my-4">
          <h2>My Groups</h2>
        </div>

        {/* LIST OF ACCEPTED GROUPS */}
        {redux_groupList
          ? (
                <div>
                  <div>
                    <FormInput
                      id="GroupSearch"
                      text="Search for Group"
                      type="text"
                      onChange={searchTermHandler}
                    />
                  </div>
                  <Row className="pt-4">
                    <Col xs={9} className="border-right">
                      <b>Your Groups</b>
                    </Col>
                    <Col className="text-center">
                      <b>Action</b>
                    </Col>
                  </Row>
                </div>
              )
          : "You are not part of any groups"}

        {redux_groupList
          ? redux_groupList.map((group, index) => {
              return searchTerm.length === 0 ||
                group.name.toLowerCase().search(searchTerm) > -1 ? (
                <Row className="pt-4" key={index}>
                  <Col xs={9} className="border-right">
                    <p>{group.groupName}</p>
                  </Col>
                  <Col>
                    <div className="btn-group mx2 ml-5">
                      <Button data-id={group.id} onClick={groupRedirection}>
                        View Group
                      </Button>
                    </div>
                  </Col>
                </Row>
              ) : (
                ""
              );
            })
          : ""}
        {/* LIST OF GROUP INVITES */}
        {/* {inviteList.length} */}
        {redux_inviteList && redux_inviteList.length > 0 ? (
          <Row className="pt-4">
            <Col xs={9} className="border-right">
              <b>Group Invites</b>
            </Col>
            <Col className="text-center">
              <b>Action</b>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {console.log(redux_inviteList)}
        {renderInvites(redux_inviteList)}
      </div>
    </div>
  );
};

export default MyGroups;
