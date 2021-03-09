import React, { useEffect, useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import "./profile.css";
import img from "../constants/image1.jpg";
// import { Link } from "react-router-dom";

const Profile = () => {
  let data = {
    username: "a@a.com",
    firstName: "Ujjwal",
    phoneNumber: "4085496787",
    currency: "USD",
    language: "English",
    timezone: "PST",
  };
  let [userInfo, setUserInfo] = useState();
  let [editStatus, setEditStatus] = useState(false);
  useEffect(() => {
    setUserInfo(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editHandler = () => {
    setEditStatus(true);
  };

  const saveEdit = () => {
    const newName = document.getElementById("newName").value;
    const newEmail = document.getElementById("newEmail").value;
    const newNumber = document.getElementById("newNumber").value;
    const newLanguage = document.getElementById('newLanguage').value;
    const newcurrency = document.getElementById('newcurrency').value;
    const newtimezone = document.getElementById('newtimezone').value;
    const updatedData = {
      username: newEmail,
      firstName: newName,
      phoneNumber: newNumber,
      language: newLanguage,
      currency: newcurrency,
      timezone: newtimezone
    };
    setUserInfo(updatedData);
    setEditStatus(false);
  };

  const closeEdit = () => {
    setEditStatus(false);
  };

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
                    <h5>
                      Username:{" "}
                      {editStatus ? (
                        <input
                          type="email"
                          id="newEmail"
                          defaultValue={userInfo ? userInfo.username : ""}
                        />
                      ) : userInfo ? (
                        userInfo.username
                      ) : (
                        ""
                      )}
                    </h5>
                  </div>
                  <div>
                    <h5>
                      Name:{" "}
                      {editStatus ? (
                        <input
                          type="name"
                          id="newName"
                          defaultValue={userInfo ? userInfo.firstName : ""}
                        />
                      ) : userInfo ? (
                        userInfo.firstName
                      ) : (
                        ""
                      )}
                    </h5>
                  </div>
                  <div>
                    <h5>
                      Phone Number:{" "}
                      {editStatus ? (
                        <input
                          type="text"
                          id="newNumber"
                          defaultValue={userInfo ? userInfo.phoneNumber : ""}
                        />
                      ) : userInfo ? (
                        userInfo.phoneNumber
                      ) : (
                        ""
                      )}
                    </h5>
                  </div>
                  <div>
                    <h5>
                      Language:{" "}
                      {editStatus ? (
                        <select
                          id="newLanguage"
                          defaultValue={userInfo ? userInfo.language : ""}
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>Hindi</option>
                        </select>
                      ) : userInfo ? (
                        userInfo.language
                      ) : (
                        ""
                      )}
                    </h5>
                  </div>
                  <div>
                    <h5>
                      Currency:{" "}
                      {editStatus ? (
                        <select
                          id="newcurrency"
                          defaultValue={userInfo ? userInfo.currency : ""}
                        >
                          <option>USD</option>
                          <option>KWD</option>
                          <option>BHD</option>
                          <option>EUR</option>
                          <option>CAD</option>
                        </select>
                      ) : userInfo ? (
                        userInfo.currency
                      ) : (
                        ""
                      )}
                    </h5>
                  </div>
                  <div>
                    <h5>
                      Time Zone:{" "}
                      {editStatus ? (
                        <select
                          id="newtimezone"
                          defaultValue={userInfo ? userInfo.timezone : ""}
                        >
                          <option>PST</option>
                          <option>GMT</option>
                          <option>IST</option>
                          <option>MST</option>
                          <option>BST</option>
                        </select>
                      ) : userInfo ? (
                        userInfo.timezone
                      ) : (
                        ""
                      )}
                    </h5>
                  </div>

                  <div className="mt-4 row">
                    <div className="col-xs-3 pl-4">
                      {editStatus ? (
                        <div>
                          <Button
                            className="btn btn-success"
                            onClick={saveEdit}
                          >
                            Save Changes
                          </Button>
                          {" "}
                          <Button
                            className="btn btn-danger"
                            onClick={closeEdit}
                          >
                            Discard Changes
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="btn btn-primary"
                          onClick={editHandler}
                        >
                          Edit Profile
                        </Button>
                      )}
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

export default Profile;
