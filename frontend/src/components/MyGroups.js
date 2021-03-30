import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import FormInput from "./FormInput";
import { useSelector } from "react-redux";
import axios from "axios";
const MyGroups = () => {
  const user = useSelector((state) => state.user);
  const redux_userId = user?user.userId:false;
  const history = useHistory();
  const [inviteList, setInviteList] = useState();
  const [groupList, setGroupList] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  // Getting data from the backend and storing them in react states.
  const getInviteData = async () => {
    await  axios.get("http://localhost:3001/mygroups",{params:{userId:redux_userId}}).then((res) => {
      if (res.status === 201) {
        setInviteList(res.data.inviteGroup);
      }
      if (res.status === 101) {
        console.log("oh no");
      }
    });
  };
  const getGroupData = async () =>{
    await  axios.post("http://localhost:3001/mygroups",{userId:redux_userId}).then((res) => {
      if (res.status === 201) {
        setGroupList(res.data.myGroups);
      }
    });
  }
  useEffect(() => {
    getInviteData();
    getGroupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const acceptHandler = async (e) => {
    // Updating group List
    let newGroupList = [];
    if (groupList) {
      newGroupList = [...groupList];
    }
    let acceptedGroup = inviteList[e.target.dataset.id];

    // Sending invite status to backend
    await  axios.post("http://localhost:3001/accInvStatus", { acceptedGroup }).then((response) => {
      if (response.status === 269) {
        newGroupList.push(acceptedGroup);
        setGroupList(newGroupList);
        // Updating Invite List
        let newInviteList = [...inviteList];
        newInviteList.splice(e.target.dataset.id, 1);
        setInviteList(newInviteList);
      }
    });
  };

  const rejectHandler = async (e) => {
    // Updating Invite List
    const rejectedGroup = inviteList[e.target.dataset.id];
    // Sending invite status to backend
    await  axios.post("http://localhost:3001/rejInvStatus", { rejectedGroup }).then((response) => {
      if (response.status === 269) {
        let newInviteList = [...inviteList];
        newInviteList.splice(e.target.dataset.id, 1);
        setInviteList(newInviteList);
      }
    });
  };

  const searchTermHandler = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    console.log(inviteList);
  };

  const groupRedirection = async (e) => {
    history.push("/groupPage?id=" + e.target.dataset.id);
  };

  const renderInviteList = () => {
    return inviteList
      ? inviteList.map((group, index) => (
          <Row className="pt-4" key={index}>
            <Col xs={9} className="border-right">
              <span>{group.name}</span>
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
  
  const isLoggedIn = user ? user.isLogged : false;
  let redirectVar = null;
  if (!isLoggedIn) {
    redirectVar = <Redirect to="/login" />;
  }
  return (
    <div>
      {redirectVar}
      <div className="container">
        <div className="my-4">
          <h2>My Groups</h2>
        </div>
        <div>
          <FormInput
            id="GroupSearch"
            text="Search for Group"
            type="text"
            onChange={searchTermHandler}
          />
        </div>
        {/* LIST OF ACCEPTED GROUPS */}
        <Row className="pt-4">
          <Col xs={9} className="border-right">
            <b>Your Groups</b>
          </Col>
          <Col className="text-center">
            <b>Action</b>
          </Col>
        </Row>

        {groupList
          ? groupList.map((group, index) => {
              return searchTerm.length === 0 ||
                group.name.toLowerCase().search(searchTerm) > -1 ? (
                <Row className="pt-4" key={index}>
                  <Col xs={9} className="border-right">
                    <p>{group.name}</p>
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
        {inviteList && inviteList.length > 0 ? (
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
        {renderInviteList()}
      </div>
    </div>
  );
};

export default MyGroups;
