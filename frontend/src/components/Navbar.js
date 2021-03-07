import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
    // window.location.replace("/login");
    
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login" onClick={this.handleLogout}>
              <span className="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
          <li>
              <Link to="/register">
                  <span className="glyphicon glyphicon-sign-up"></span> Sign Up
              </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/dashboard" />;
    }
    return (
      <div>
        {redirectVar}
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <a className="navbar-brand" href='/register'>Splitwise</a>
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
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link active" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </div>
            </div>

            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
