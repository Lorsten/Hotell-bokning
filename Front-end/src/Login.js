import React from 'react';
import {SetLocalStorage, user}  from './Main';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: '',
      password: '',
      passwordauth: '',
      errorMessage:'Fel lösenord eller användarnamn',
      noError:'',
      showError:false
    })
   //Bind the buttons
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
  //if localstorage exists redirect to index
  if(user()){
    this.props.history.push('/');
  }
}
 handleSubmit(event) {
  //Validate the input and set showerror to true if no input has been typed in
  if(this.state.password.length < 1  || this.state.username.length < 1){
    this.setState({showError:true,
    errorMessage:'Du måste fylla i båda fälten!'})
    event.preventDefault();
    return;
  }
  else{
    //Get the username from the server and call the valdiate function with the password
  this.setState({showError:false})
  Axios.get(`https://fast-scrubland-80308.herokuapp.com/users/authentication/${this.state.username}`)
  .then(res => {
    //Check if username exists
    if(res.data !=null){
     this.validate(res.data.password);
  }
  //Write out a message
  else{
    this.setState({errorMessage:'Användarnamnet finns inte',showError:true})
  }
    })
    .catch((error) => {
      console.log(error);
    })
}
event.preventDefault();
 }
 validate(pass,event){
   //If the password matches the typed password create a localstorage with the password from the main component
  if(this.state.password ===  pass){
    SetLocalStorage(this.state.username);
    //Reload page to update logged in state
    window.location.reload();
}
else{
  // IF password doesn't match show error to user
   this.setState({showError:true,
    errorMessage:'Lösenordet är inte rätt'})
  return;
}
 }
  render(){
    return (
      <div id="form-user">
        <h2>Logga in för att gå vidare!</h2>
        <h4>{this.state.showError ? this.state.errorMessage : this.state.noError}</h4>
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
      <input type="submit" value="Logga in" />
    </form>
    <h3>Har du inte ett konto?</h3>
    <div className='userbutton'>
    <NavLink to='/Register'>Skapa konto</NavLink>
    </div>
    </div>
    )
}
}

export default Login;