import React from 'react';
import './index.css';
import {user} from './Main';
import {
  Route,
  Redirect
} from "react-router-dom";

//Create a Route for admin pages which only display the route if admin islogged in
function AdminRoute({component:Component, ...rest}){
  return (
    <Route
      {...rest}
      render={(props) => user() === "Admin" ? <Component {...props} /> : <Redirect to='/Home'/>}
     />
  )
}


export default AdminRoute;



