import React, { useEffect, useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import axios from "axios";
import "./profile.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
const FormData = require("form-data");
// import { Link } from "react-router-dom";

const Profile = () => {
  let redux_user = useSelector((state) => state.user);
  const redux_userId = redux_user ? redux_user.userId : false;
  let [userInfo, setUserInfo] = useState();
  let [editStatus, setEditStatus] = useState(false);
  let [image, setImage] = useState();
  let [imageUrl, setImageUrl] = useState();
  const getData = async () => {
    await axios
      .get("http://18.144.25.88:3001/profile", {
        params: { username: redux_user ? redux_user.username : "" },
      })
      .then((res) => {
        setUserInfo(res.data[0]);
        const url =
          res.data[0] && res.data[0].image && res.data[0].image.length > 4
            ? "/userImages/" + res.data[0].username + ".jpg"
            : "/userImages/default.jpg";
        setImageUrl(url);
      });
  };
  useEffect(() => {
    getData();
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
    ///////////////////////
    console.log(image);
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
    await axios
      .post("http://18.144.25.88:3001/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res, req) => {
        if (res.status === 201) {
          console.log(res.data.message);
          setUserInfo(updatedData);
          setEditStatus(false);
        }
      });
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
                  src={imageUrl}
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
                          defaultValue={userInfo ? userInfo.Fname : ""}
                        />
                      ) : userInfo ? (
                        userInfo.Fname
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
                          defaultValue={userInfo ? userInfo.lang : ""}
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>Hindi</option>
                        </select>
                      ) : userInfo ? (
                        userInfo.lang
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
