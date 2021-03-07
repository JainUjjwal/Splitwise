import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";
import axios from "axios";
//create the Navbar Component
const Navbar = () => {
  //handle logout to destroy the cookie
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user ? user.isLogged : false;
  const handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
    dispatch(
      logout({
        username: null,
        password: null,
        Fname: null,
        phoneNumber: null,
        isLogged: false,
      })
    );
  };
  //   const setLink = () => {
  //if Cookie is set render Logout Button
  let changeNav;
  axios.get("http://localhost:3001/login").then((response) => {
    changeNav = true;
    console.log(changeNav);
  });

  let navLogin = null;
  if (isLoggedIn) {
    console.log("Able to read cookie");
    navLogin = (
      <span>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav navbar-left">
            <Link className="nav-item nav-link active" to="/dashboard">
              Home <span className="sr-only"></span>
            </Link>
            <Link className="nav-item nav-link active" to="/mygroups">
              My Groups <span className="sr-only"></span>
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to="/profile">
              <span className="glyphicon glyphicon-user"></span>My Profile
            </Link>
          </li>
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to="/login" onClick={handleLogout}>
              <span className="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
        </div>
      </span>
    );
  } else {
    //Else display login button
    console.log("Not Able to read cookie");
    navLogin = (
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to="/login">
            <span className="glyphicon glyphicon-log-in"></span> Login
          </Link>
        </li>
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to="/register">
            <span className="glyphicon glyphicon-sign-up"></span> Sign Up
          </Link>
        </li>
      </ul>
    );
  }
  //   };

  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            Splitwise
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {navLogin}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
