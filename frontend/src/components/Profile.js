import React, { useEffect, useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import axios from "axios";
import "./profile.css";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {getProfile, updateProfile} from "../reducers/ProfileReducer"
const FormData = require("form-data");
// import { Link } from "react-router-dom";

const Profile = () => {
  const redux_user = useSelector((state) => state.user);
  const redux_userId = redux_user ? redux_user.userId : false;
  const redux_userInfo = useSelector((state)=>state.profile);
  let redux_profile = redux_userInfo ? redux_userInfo.info : false;
  let redux_imageURL = redux_userInfo ? redux_userInfo.imageUrl : false
  let [userInfo, setUserInfo] = useState(redux_profile);
  let [editStatus, setEditStatus] = useState(false);
  let [image, setImage] = useState();
  let [imageUrl, setImageUrl] = useState(redux_userInfo);
  const dispatch = useDispatch()
  // const getData = async () => {
    
  //   await axios
  //     .get("http://localhost:3001/profile", {
  //       params: { username: redux_user ? redux_user.username : "" },
  //     })
  //     .then((res) => {
  //       console.log(res.data[0]);
  //       setUserInfo(res.data[0]);        
  //       const url =
  //       res.data[0] && res.data[0].imgPath && res.data[0].imgPath.length > 4
  //           ? "/userImages/" + res.data[0].username + ".jpg"
  //           : "/userImages/default.jpg";
  //       setImageUrl(url);
  //     });
  // };
  useEffect(() => {
    dispatch(getProfile({userId: redux_userId ? redux_userId : "" }))
    // getData();
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
      timezone: document.getElementById("newtimezone").value,
      image: image,
    };
    formData.append("userId", redux_userId);
    formData.append("image", image);
    formData.append("username", updatedData.username);
    formData.append("Fname", updatedData.Fname);
    formData.append("phoneNumber", updatedData.phoneNumber);
    formData.append("lang", updatedData.lang);
    formData.append("currency", updatedData.currency);
    formData.append("timezone", updatedData.timezone);
    dispatch(updateProfile({redux_userId: redux_userId,updatedData:updatedData}))
    setEditStatus(false);
    // await axios
    //   .post("http://localhost:3001/profile", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res, req) => {
    //     if (res.status === 201) {
    //       console.log(res.data.message);
    //       setUserInfo(updatedData);
    //       setEditStatus(false);
    //       setImageUrl('/userImages/'+updatedData.username+'.jpg');
    //     }
    //   });
  };

  const closeEdit = () => {
    setEditStatus(false);
  };
  const user = useSelector((state) => state.user);
  const isLoggedIn = user ? user.isLogged : false;
  let redirectVar = null;
  if (!isLoggedIn) {
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
                  src={ imageUrl ? imageUrl : redux_imageURL }
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
                          defaultValue={redux_profile ? redux_profile.username : ""}
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
                          defaultValue={redux_profile ? redux_profile.Fname : ""}
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
                          defaultValue={redux_profile ? redux_profile.phoneNumber : ""}
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
                          defaultValue={redux_profile ? redux_profile.currency : ""}
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
                          defaultValue={redux_profile ? redux_profile.timezone : ""}
                        >
                          <option>PST</option>
                          <option>GMT</option>
                          <option>IST</option>
                          <option>MST</option>
                          <option>BST</option>
                        </select>
                      ) : redux_profile ? (
                        redux_profile.timezone
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
