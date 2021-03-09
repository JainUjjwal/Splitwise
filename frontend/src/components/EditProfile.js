import React, { useEffect, useState } from "react";
import { Dropdown, Card, Image } from "react-bootstrap";
import "./profile.css";
import img from "../constants/image1.jpg";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const EditProfile = () => {
  let data = {
    username: "a@a.com",
    firstName: "Ujjwal",
    phoneNumber: "4085496787",
  };
  let [userInfo, setUserInfo] = useState();
  useEffect(() => {
    setUserInfo(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="container">
        <Card className="my-4">
          <Card.Header>
            <div>
              <h2>My Profile</h2>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col">
                <Image src={img} roundedCircle></Image>
              </div>
              <div className="col">
                <div className="my-5">
                  <div>
                    <h5>Username: {userInfo ? userInfo.username : ""}</h5>
                  </div>
                  <div>
                    <h5>Name: {userInfo ? userInfo.firstName : ""}</h5>
                  </div>
                  <div>
                    <h5>
                      Phone Number: {userInfo ? userInfo.phoneNumber : ""}
                    </h5>
                  </div>
                  <div className="mt-4 btn-group row">
                    <div className="col-xs-3 pl-4">
                      <Link to="/profile" className="btn btn-primary ml-3">
                        Save Changes
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
