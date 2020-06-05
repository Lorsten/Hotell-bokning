//Navigation file
import React from 'react';
import {user, RemoveUser}  from './Main';
import { NavLink } from 'react-router-dom';


class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = ({islogged:false,
    isAdmin:false});
    this.HandleLogout = this.HandleLogout.bind(this);
  }
  componentDidMount(){
    //Check if localstorage exists on mount
    if(user()){
      this.setState({
        islogged:true

        })
           //Check if name is admin and set admin to true
        if(user() === 'Admin'){
          this.setState({isAdmin:true});
        }
        else{
          return
        }
    }
    else{
      return;
    }
  }
  //Remove the localstorage when this function is called
  HandleLogout(){
    if(user()){
      RemoveUser();
      this.setState({
        islogged:false
      })
    }
    }
  render(){
    const {islogged} = this.state;
    //If admin is true show admin menu
    if(this.state.islogged && this.state.isAdmin){
      return(
        <div id="menu-section">
        <li><NavLink  className="menu" to="/Home">Hem</NavLink></li>
         <li><NavLink className="menu" to="/Edit"> Visa rum</NavLink></li>
          <li><NavLink className="menu" to="/Add_rom" >Lägg till rum</NavLink></li>
          <li><NavLink className="menu" to="/Users">Visa användare</NavLink></li>
         {islogged? (<li><NavLink  className="menu" to="/" exact={true} onClick={this.HandleLogout}>Logga ut</NavLink></li>):(<li><NavLink  className="menu" to="/Login"  onClick={this.HandleLogout}>Logga in</NavLink></li>)}
         </div>
      )
    //If a user is logged in show user menu
    }else if(this.state.islogged){
    return(
      <div id="menu-section">
        <li><NavLink  className="menu" to="/Home">Hem</NavLink></li>
        <li><NavLink  className="menu" to="/Reservation">Bokningar</NavLink></li>
         {islogged? (<li><NavLink  className="menu" to="/" exact={true} onClick={this.HandleLogout}>Logga ut</NavLink></li>):(<li><NavLink  className="menu" to="/Login"  onClick={this.HandleLogout}>Logga in</NavLink></li>)}
         </div>
    )
  }
   //Normal menu
  else{
    return(
         <div id="menu-section">
        <li><NavLink  className="menu" to="/Home">Hem</NavLink></li>
          <li><NavLink className="menu" to="/Register" >Registera</NavLink></li>
         {islogged? (<li><NavLink className="menu" to="/Edit" onClick={this.HandleLogout}>Logga ut</NavLink></li>):(<li><NavLink  className="menu" to="/Login"  onClick={this.HandleLogout}>Logga in</NavLink></li>)}
         </div>
    )
  }
}
}

  export default Nav;