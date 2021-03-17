import React from "react"
import { Redirect, Route } from "react-router";
// import userAuth from './UserAuth'
// let userAuth = require('./UserAuth')
const privateRoute = ({component: Component, ...rest}) =>{
    
return(<Route render = {(props)=> props.isAuthenticated ? (< Component {...props}></Component>) : (<Redirect to='/login'/>)} />)}
    
    

export default privateRoute;