import React from 'react';
import './index.css';
import {user} from './Main';
import {
  Route,
  Redirect
} from "react-router-dom";

//Create a PrivateRoute to prevent user from reaching routes encapsed by this function
function PrivateRoute({component:Component, ...rest}){
  return (
    <Route
      {...rest}
      render={(props) => user() ? <Component {...props} /> : <Redirect to='/Login'/>}
     />
  )
}


export default PrivateRoute;



