import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";

const MyGroups = () => {
  const inviteGroup = [
    { id: "1", name: "Group 1" },
    { id: "2", name: "Group 2" },
  ];
  const myGroups = [
    { id: "1", name: "House" },
    { id: "2", name: "Trips" },
  ];
  const [inviteList, setInviteList] = useState();
  const [groupList, setGroupList] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setInviteList(inviteGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setGroupList(myGroups);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const acceptHandler = (e) => {
    // Updating group List
    let newGroupList = [...groupList];
    newGroupList.push(inviteList[e.target.dataset.id]);
    setGroupList(newGroupList);
    // Updating Invite List
    let newInviteList = [...inviteList];
    newInviteList.splice(e.target.dataset.id, 1);
    setInviteList(newInviteList);
  };

  const rejectHandler = (e) => {
    // Updating Invite List
    let newInviteList = [...inviteList];
    newInviteList.splice(e.target.dataset.id, 1);
    setInviteList(newInviteList);
  };

  const searchTermHandler = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const renderInviteList = () => {
    return inviteList
      ? inviteList.map((group, index) => (
          <Row className="pt-4" key={index}>
            <Col xs={9} className="border-right">
              <Link to="/groupPage">{group.name}</Link>
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

  return (
    <div>
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
                    <Link to="/groupPage">{group.name}</Link>
                  </Col>
                  <Col>
                    <div className="btn-group mx2 ml-5">
                      <Button data-id={index} variant="outline-primary">
                        <Link to="/groupPage"> View Group</Link>
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
