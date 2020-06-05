import React from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: '',
      password: '',
      showError:false,
      userMsg: '',
      apiResponse:[]
    })
   //Bind two buttons submit and change
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }
 handleChange(event) {
   const target = event.target;
   const value = target.value;
   const name = target.name;
   this.setState({
     [name]: value
 })
}
componentDidMount(){
  //Get all usersnames for to validate if user already exists
  Axios.get(`https://fast-scrubland-80308.herokuapp.com/users/getusers`)
  .then(res => {
    const apiResponse = res.data;
    this.setState({apiResponse});
  }
  )
}
//On submit post the username and the password to the createuser route on the serverside
 handleSubmit(event) {
  // Make a few if statement to validate the user inputed data 
  if(this.state.password.length < 1  || this.state.username.length < 1){
    this.setState({showMsg:true,
      userMsg:'Du måste fylla i båda fälten!'})
      event.preventDefault();
      return;
  }
  else if(this.state.password.length < 5 && this.state.username.length < 3){
    this.setState({showMsg:true,
      userMsg:'Ditt användarnman och lösenord är för kort'})
      event.preventDefault();
      return;
  }
  else if(this.state.username.length < 3){
    this.setState({showMsg:true,
      userMsg:'Ditt användarnamn måste vara minst 5 tecken!'})
      event.preventDefault();
      return;
  }
  else if(this.state.password.length < 5){
    this.setState({showMsg:true,
      userMsg:'Ditt lösenord måste vara minst 5 tecken!'})
      event.preventDefault();
      return;
  }
    //Check if apiresponse is not empty
    if(this.state.apiResponse.length > 1){
      //Use a for loop to check if Username already exists
    for(let i = 0; i < this.state.apiResponse.length; i++){
      if(this.state.username === this.state.apiResponse[i].UserName){
        //SHow error message if room exists by setting state 
        this.setState({
          showMsg:true,
          userMsg:'Användarnamnet '+this.state.username +' finns redan, försök igen'
        })
        event.preventDefault();
        return;
    }
    }
  }
 const user = {
    Username: this.state.username,
    password: this.state.password
 }
 //Post the data by sending with a a object with username and password
 Axios.post('https://fast-scrubland-80308.herokuapp.com/users/CreateUser/', user)
 .then(res => {
    console.log(res);
    console.log(res.data);
  })
  .catch(err =>{
    if(err.response){
    console.log(err);
    }
 })
 this.setState({
  userMsg:'Konto skapat',
  showMsg:true
})
 event.preventDefault();
}
  render(){
    return (
      <div id="form-user">
          <h2>Skapa ett konto</h2>
          <h4>{this.state.showMsg ? this.state.userMsg : ''}</h4>
      <form onSubmit={ this.handleSubmit}>
        <label>
       Användarnamn:
        <input type="text" name='username' value={this.state.username}
        onChange={this.handleChange}></input>
      </label>
     
      <label>
       Lösenord:
        <input type="password" name='password'value={this.state.password} onChange={this.handleChange}></input>
      </label>
      <br />
      <input type="submit" value="Registera konto" />
    </form>
    <h3>Har redan ett konto?</h3>
    <div className='userbutton'>
    <NavLink to='/Login'>Logga in</NavLink>
    </div>
    </div>
    )
}
}
export default Register;