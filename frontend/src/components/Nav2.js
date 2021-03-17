import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers";
//create the Navbar Component
const Navbar = (props) => {
  //handle logout to destroy the cookie
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user ? user.isLogged : false;
  const handleLogout = () => {
    history.push('/login');
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
  let navLogin = null;
  if (isLoggedIn) {
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
            <Link className="nav-item nav-link" to="/history">
              All Transactions <span className="sr-only"></span>
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
          <span className="navbar-brand" onClick={()=>{history.push('/dashboard')}}>
            Splitwise
          </span>
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
