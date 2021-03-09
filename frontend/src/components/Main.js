import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import LoginForm from './LoginForm';
import Register from './Register';
import Dashboard from './Dashboard'
// import Home from './Home/Home';
// import Delete from './Delete/Delete';
// import Create from './Create/Create';
import Navbar from './Nav2';
import MyGroups from './MyGroups';
import GroupPage from './GroupPage';
import Profile from './Profile';
import Landing from './Landing';
import EditProfile from './EditProfile';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                <Navbar />
                {/*Render Different Component based on Route*/}
                
                <Route path="/" exact component={Landing} />
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/mygroups" component={MyGroups} />
                <Route path="/groupPage" component={GroupPage} />
                <Route path="/profile" component={Profile} />
                <Route path="/editprofile" component={EditProfile} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;