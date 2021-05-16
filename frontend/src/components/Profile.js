import React, { useEffect, useState } from "react";
import { Card, Image, Button } from "react-bootstrap";

import "./profile.css";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProfile, updateProfile } from "../reducers/ProfileReducer";
const FormData = require("form-data");
// import { Link } from "react-router-dom";

const Profile = () => {
  const redux_user = useSelector((state) => state.user);
  const redux_userId = redux_user ? redux_user.userId : false;
  const redux_userInfo = useSelector((state) => state.profile);
  let redux_profile = redux_userInfo ? redux_userInfo.info : false;
  let redux_imageURL = redux_userInfo ? redux_userInfo.imageUrl : '';
  // let [userInfo, setUserInfo] = useState(redux_profile);
  let [editStatus, setEditStatus] = useState(false);
  let [image, setImage] = useState();
  let [imageUrl, setImageUrl] = useState(redux_imageURL);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile({ userId: redux_userId ? redux_userId : "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editHandler = () => {
    setEditStatus(true);
  };
  const uploadImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  const saveEdit = async () => {
    const formData = new FormData();

    const updatedData = {
      username: document.getElementById("newEmail").value,
      Fname: document.getElementById("newName").value,
      phoneNumber: document.getElementById("newNumber").value,
      lang: document.getElementById("newLanguage").value,
      currency: document.getElementById("newcurrency").value,
      timeZone: document.getElementById("newtimezone").value,
      image: image,
    };
    formData.append("userId", redux_userId);
    formData.append("image", image);
    formData.append("username", updatedData.username);
    formData.append("Fname", updatedData.Fname);
    formData.append("phoneNumber", updatedData.phoneNumber);
    formData.append("lang", updatedData.lang);
    formData.append("currency", updatedData.currency);
    formData.append("timezone", updatedData.timeZone);
    dispatch(
      updateProfile({ redux_userId: redux_userId, updatedData: updatedData })
    );
    setEditStatus(false);
  };

  const closeEdit = () => {
    setEditStatus(false);
  };
  const user = useSelector((state) => state.user);
  const isLoggedIn = user ? user.isLogged : false;
  const util = require("../reducers/utilities");

  let redirectVar = null;
  if (!util.isLoggedIn()) {
    redirectVar = <Redirect to="/login" />;
  }
  return (
    <div>
      {redirectVar}
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
                <Image
                  src={redux_imageURL.length>2 ? redux_imageURL : 'userImages/default.png'}
                  alt="not found"
                  style={{
                    height: "100%",
                    maxHeight: "300px",
                    width: "100%",
                    maxWidth: "400px",
                  }}
                ></Image>
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
                          defaultValue={
                            redux_profile ? redux_profile.username : ""
                          }
                        />
                      ) : redux_profile ? (
                        redux_profile.username
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
                          defaultValue={
                            redux_profile ? redux_profile.Fname : ""
                          }
                        />
                      ) : redux_profile ? (
                        redux_profile.Fname
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
                          type="number"
                          id="newNumber"
                          defaultValue={
                            redux_profile ? redux_profile.phoneNumber : ""
                          }
                        />
                      ) : redux_profile ? (
                        redux_profile.phoneNumber
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
                          defaultValue={redux_profile ? redux_profile.lang : ""}
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>Hindi</option>
                        </select>
                      ) : redux_profile ? (
                        redux_profile.lang
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
                          defaultValue={
                            redux_profile ? redux_profile.currency : ""
                          }
                        >
                          <option>USD</option>
                          <option>KWD</option>
                          <option>BHD</option>
                          <option>EUR</option>
                          <option>CAD</option>
                        </select>
                      ) : redux_profile ? (
                        redux_profile.currency
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
                          defaultValue={
                            redux_profile ? redux_profile.timeZone : ""
                          }
                        >
                          <option>PST</option>
                          <option>GMT</option>
                          <option>IST</option>
                          <option>MST</option>
                          <option>BST</option>
                        </select>
                      ) : redux_profile ? (
                        redux_profile.timeZone
                      ) : (
                        ""
                      )}
                    </h5>
                    {editStatus ? (
                      <div>
                        <input
                          type="file"
                          name="profieImage"
                          id="profileImage"
                          accept="image/*"
                          onChange={uploadImage}
                          style={{ display: "inline-block", width: "90%" }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
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
                          </Button>{" "}
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
