import React from "react";
import Axios from 'axios';
import { NavLink } from "react-router-dom";
import {user} from './Main';

function UserName(props){
  const username = user();
  return <h2>Välkommen {username}</h2>
}

class showRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({apiResponse: [],
    message:'',
    showmessage:false});
   this.removeItem = this.removeItem.bind(this);
  }
    componentDidMount(){
      Axios.get("https://fast-scrubland-80308.herokuapp.com/hotel")
      .then(res => {
        const apiResponse = res.data;
        this.setState({apiResponse});
      }
      )
    }
   removeItem(id){
  Axios.delete(`https://fast-scrubland-80308.herokuapp.com/hotel/${id}` )
  .then(res => {
    console.log(res);
    console.log(res.data)
  })  
  let copyApiResponse = this.state.apiResponse
  for(let i = 0; i < copyApiResponse.length; i++){
    let api = copyApiResponse[i];
      if(api._id === id){
      copyApiResponse.splice(i,1)
      break
    }
  }
  this.setState({apiResponse: copyApiResponse,
    message:'Rum raderat',
    showmessage:true })
    }

    //Function for trimming a sting
    trimwords(str,n){
      return (str.match(RegExp(".{"+n+"}\\S*"))||[str])[0];
    }
  render(){
    const total = this.state.apiResponse.length;
    const rooms = this.state.apiResponse.filter(items =>  items.Occupied === true);
    return (
      <div id="table-container">
          <div id="header">
            <UserName/>
            <h2>Ändra eller ta bort skapade rum</h2>
          <h3>Det finns {total} antal rum</h3> 
          {rooms.length > 1 ?<h3>{rooms.length} rum är lediga</h3> :<h3>{rooms.length} rum ledigt</h3>} 
          {this.state.showmessage ? <h3>{this.state.message}</h3>: ''}
      </div>
      <table key='table_rooms'>
        <thead key="thead">
      <tr>
        <th>Rum nummer</th>
        <th>Våning</th>
        <th>Number of rooms</th>
        <th>Occupied</th>
        <th>Pris</th>
        <th>Ta bort</th>
        <th>Ändra</th>
      </tr>
      </thead>
      <tbody>
      {this.state.apiResponse.map(room => {
        return (
      <tr key={room._id} className={
          room.Occupied ? 'Occupied' : ''}>
        <td>{room.RoomNumber}</td>
        <td>{room.Floor}</td>
        <td>{this.trimwords(room.Description,15)}</td>
        <td>{/* If room is empty  if true rom is not empty */ room.Occupied ? 'Nej':'Ja'}</td>
        <td>{room.Price} Kr</td>
        <td><button onClick={() => {if(window.confirm('Säkert på att du vill radera rum '+ room.RoomNumber)){ room.Occupied ? alert('Du kan endast radera rum som inte är lediga!') 
        :this.removeItem(room._id)};}}>Radera</button></td>
        <td><NavLink to={`/Edit_page/${room._id}`}>Ändra</NavLink></td>
      </tr>
        )
      })
    }
         </tbody >
      </table>
      </div>
     
    )
  }
}

export default showRooms;
   



