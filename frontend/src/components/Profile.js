import React, { useEffect, useState } from "react";
import { Dropdown, Card, Image } from "react-bootstrap";
import "./profile.css";
import img from "../constants/image1.jpg";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Profile = () => {
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
  const history = useHistory()
  const editProfile = () =>{
    history.push('/editProfile');
  }
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
                    <div className='col-xs-5'>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Language
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>English</Dropdown.Item>
                        <Dropdown.Item>Spanish</Dropdown.Item>
                        <Dropdown.Item>Hindi</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div className='col-xs-5 pl-4'>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Currency
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>USD</Dropdown.Item>
                        <Dropdown.Item>KWD</Dropdown.Item>
                        <Dropdown.Item>BHD</Dropdown.Item>
                        <Dropdown.Item>EUR</Dropdown.Item>
                        <Dropdown.Item>CAD</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div className='col-xs-3 pl-4'><Link to="/editProfile" className="btn btn-primary ml-3">Edit Profile</Link></div>
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

export default Profile;
