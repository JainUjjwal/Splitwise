import React from "react";
import {Dropdown } from "react-bootstrap";
import "./profile.css";
import Navbar from "./Nav2"
const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="my-4">
          <h2>My Profile</h2>
        </div>
        <div>
          <Dropdown class="col-sm">
            <Dropdown.Toggle id="dropdown-basic">Language</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Enlish</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Spanish</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Hindi</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown class="col-sm">
            <Dropdown.Toggle id="dropdown-basic">Currency</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>USD</Dropdown.Item>
              <Dropdown.Item>KWD</Dropdown.Item>
              <Dropdown.Item>BHD</Dropdown.Item>
              <Dropdown.Item>EUR</Dropdown.Item>
              <Dropdown.Item>CAD</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Profile;
