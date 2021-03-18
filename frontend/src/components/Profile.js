import React, { useEffect, useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import axios from 'axios';
import "./profile.css";
import img from "../constants/image1.jpg";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
// import { Link } from "react-router-dom";

const Profile = () => {
  let redux_user = useSelector(state=>state.user)
  let [userInfo, setUserInfo] = useState();
  let [editStatus, setEditStatus] = useState(false);
  useEffect(() => {
    axios.get(" /profile", {params: {username:redux_user?redux_user.username:''}}).then((res)=>{
    console.log(res.data);  
    setUserInfo(res.data.userInformation[0]);
    })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editHandler = () => {
    setEditStatus(true);
  };

  const saveEdit = () => {
    const updatedData = {
      username: document.getElementById("newEmail").value,
      Fname: document.getElementById("newName").value,
      phoneNumber: document.getElementById("newNumber").value,
      lang: document.getElementById('newLanguage').value,
      currency: document.getElementById('newcurrency').value,
      timezone: document.getElementById('newtimezone').value
    };
    setUserInfo(updatedData);
    setEditStatus(false);
    axios.post(" /profile", updatedData).then((res,req)=>{
      console.log('updated Data sent.')
      console.log(res.data.message)
    })
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
