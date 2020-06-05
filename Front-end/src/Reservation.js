import React from 'react';
import Axios from 'axios';
import {user}  from './Main';

class Reservation extends React.Component{
  constructor(props){
    super(props);
    this.state = ({date:new Date(),
    apiResponse:'',
    id:'',
    message:'',
    showmessage:false});
    this.removeReservation = this.removeReservation.bind(this);
    }
    //Function for getting the data from the hotel_rooms collections
    getroom(id){

        Axios.get(`https://fast-scrubland-80308.herokuapp.com/users/reservation/${id}`)
        .then(res => {
           const apiResponse = res.data.Room[0];
           this.setState({apiResponse
           });
         })
         .catch((error) => {
             if(error.response){
                 console.log(error)
             }
         })
     }
    componentDidMount() {
        //Fetch the id of the user from the localstorage
        Axios.get(`https://fast-scrubland-80308.herokuapp.com/users/getID/${user()}`)
        .then(res => {
            //call the function getroom with the id as parameter
       this.getroom(res.data[0]._id);
       this.setState({id:res.data[0]._id});
     })
     .catch((error) => {
      if(error.response){
          console.log(error)
      }
  })
  }
    //Get the data once the userID state has been updated
    removeReservation(){
        Axios.put(`https://fast-scrubland-80308.herokuapp.com/users/reservation/${this.state.id}`, {RoomID:this.state.apiResponse._id})
        .then(res => {
            console.log(res);
            console.log(res.data)
         
        });
        //Empty te apiresponse state too remove the item from the render
       this.setState({apiResponse:'', message:'Din bokningar har raderats',
      showmessage:true})
    }
    render(){
      return(
        <div id="Data-container">
            <h2>Dina bokningar</h2>
            {this.state.showmessage ? <h3>{this.state.message}</h3>: ''}
            {this.state.apiResponse ? <div id="reservation" key={this.state.apiResponse._id}>
              <h4>Rum {this.state.apiResponse.RoomNumber}</h4>
              <h4> Våning {this.state.apiResponse.Floor}</h4>
              <h4>{this.state.apiResponse.Description.substring(0, 10)}</h4> <h4>Pris {this.state.apiResponse.Price} kr/natt </h4></div> : ''}
        {//Display the button if the apiresponse data is not empty. User have to confirm if they are sure to delete the data
        this.state.apiResponse ?<button onClick={() => {if(window.confirm('Säkert på att du vill ta bort din bokning?'))
        {this.removeReservation()};}}>Ta bort bokning</button> :<p>Du har inga bokningar</p>}
        </div>
      )
    }
  }
 
export default Reservation;