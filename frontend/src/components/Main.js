import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Navbar from "./Nav2";
import MyGroups from "./MyGroups";
import GroupPage from "./GroupPage";
import Profile from "./Profile";
import Landing from "./Landing";
import History from "./History";
// import PrivateRoute from "./privateRoute";
import userAuth from "./UserAuth";
//Create a Main Component
class Main extends Component {
  constructor() {
    super();
    this.authenticated = userAuth.isLoggedIn();
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={Register} />
          {/* <Route path="*" render={() => <Redirect to="/login" />} /> */}
          {/*Render Different Component based on Route*/}

          <Route path="/dashboard" component={Dashboard}/>

          {/* <Route path="/dashboard" component={Dashboard} /> */}
          <Route path="/mygroups" component={MyGroups} />
          <Route path="/groupPage" component={GroupPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/history" component={History} />
        </Switch>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
