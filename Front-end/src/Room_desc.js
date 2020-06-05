import React from "react";
import Axios from 'axios';
import {user}  from './Main';


class RoomDesc extends React.Component {
    constructor(props) {
      super(props);
      this.state = ({
        id: this.props.match.params.id,
        apiResponse: [],
        userID:'',
        roomID:'',
        message:'',
        showmessage:false,
        isbuttonActive:true
      });
       this.handleBooking = this.handleBooking.bind(this);
    }
    componentDidMount() {
      //Make to get request using Promise all
      Promise.all([
      Axios.get(`https://fast-scrubland-80308.herokuapp.com/hotel/${this.state.id}`),
      Axios.get(`https://fast-scrubland-80308.herokuapp.com/users/getID/${user()}`)
       ]).then(res => {
          const apiResponse = res[0].data;
          const userID = res[1].data[0];
          //Check if the data is undefined
          this.setState({
            apiResponse,
            userID,
          });
          //Check if the data is not undefined or null
          if(typeof res[1].data[0].Room[0] !== "undefined" || typeof res[1].data[0].Room[0] !== "object"){
            const roomID = res[1].data[0].Room[0]; 
             //Set the data
            this.setState({roomID});
          }
        })
        .catch((error) => {
          if(error.response){
              console.log(error)
          }
      })
  }  
    //Call the handleBooking onclick and add the room id 
    handleBooking(){
      Axios.put(`https://fast-scrubland-80308.herokuapp.com/users/Addroom/${this.state.userID._id}`, {Room: this.state.apiResponse._id})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      this.setState({ message:'Din bokning är registrerad tack för att du använder tjänsten!',
      showmessage:true,
    isbuttonActive:false})
    }
    render(){
      return(
        <div id="room-info">
      <ul key='room-desc'>
          <li><h2>Rum: {this.state.apiResponse.RoomNumber}   </h2></li>
          <li>{this.state.apiResponse.Description} </li>
          <li> Våning: {this.state.apiResponse.Floor}  </li>
          <li> Pris: {this.state.apiResponse.Price} kr/natt </li>
      </ul>
      {this.state.showmessage ? <h3>{this.state.message}</h3>: ''}
      {/*using a couple of if statement to determine if the user are allowed to make a reserveration */
       this.state.roomID ? <h4>Du har redan bokat ett rum, du måste avboka ditt nuvarande för att boka ett nytt</h4> 
       : this.state.apiResponse.Occupied ? <h2>Rummet är redan bokat</h2> 
        //If isbuttonActive is true show button else disable
       : user() ? this.state.apiResponse.Occupied ? <h2>Rummet är inte ledigt</h2>
       : this.state.isbuttonActive ? 
      <button onClick={() => {if(window.confirm('Säker på att du vill göra en bokning?')){this.handleBooking()};}}>Boka Rum</button>
      : "" :
      <h2>Logga in för att boka ett rum</h2>}
  
      </div>
      )
  }
}

   export default RoomDesc;