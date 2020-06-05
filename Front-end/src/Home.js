import React from 'react';
import Axios from 'axios';
import { user } from './Main';


class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = ({date:new Date(),
    apiResponse:[],
    isOccupied:false,
    messageMembers:'Det finns inga rum'});
    this.ShowRoomDesc = this.ShowRoomDesc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
      //Get all the data from the server
      Axios.get(`https://fast-scrubland-80308.herokuapp.com/hotel`)
        .then(res => {
          const apiResponse = res.data;
          this.setState({apiResponse});
        }
        )
      }
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
    //go to the Room_dsec route when clicking on a room using history.push
    ShowRoomDesc(id){
      this.props.history.push(`/Room_desc/${id}`);
    }
    tick(){
      this.setState({
        date:new Date()
      });
    }
    //Function for toggling between showing all and only empty rooms from the apiResponse using filter
    handleChange(event){
      const target = event.target;
      const value = target.name === 'isOccupied' ? target.checked : target.value;
      const name = target.name;
   
      this.setState({
       [name]: value
     });
    }
    //Function for trimming the text without cutting in middle of word
    trimwords(str,n){
      return (str.match(RegExp(".{"+n+"}\\S*"))||[str])[0];
    }
    render(){
      //Make a if statement to add a filter to the apiresponse which only show empty rooms depending if state filter is true
      let filterItems = this.state.apiResponse;
      if(this.state.isOccupied){
        //show only rows from the data where Occupied is not true
        filterItems = this.state.apiResponse.filter(u => !u.Occupied);
      }
      else{
        filterItems = this.state.apiResponse;
      }
      //Add options for the date
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const rooms = this.state.apiResponse.filter(items =>  items.Occupied === true);
  
      return(
        <div id="Main">
        {user() ? <h1>Välkommen {user()}</h1> : <h1>Välkommen</h1>}
        <h2>Klockan är {this.state.date.toLocaleTimeString()}</h2>
        <h2>{this.state.date.toLocaleDateString(undefined,options)}</h2>
        {rooms.length > 1 ?<h3>Det finns {rooms.length} rum är lediga</h3> :<h3>Det finns {rooms.length} rum ledigt</h3>} 
        <h3>Klick på ett rum för att se mer</h3>
        {this.state.apiResponse.length < 1 ? <h3>{this.state.messageMembers}</h3>: ''}
        <div id="table-container">
        <table key='table_rooms-main'>
        <thead key="thead-main">
      <tr>
        <th>Rumsnummer</th>
        <th>Våning</th>
        <th>Rum beskrivning</th>
        <th>Ledigt</th>
        <th>Pris(kr)/dag</th>
      </tr>
      </thead>
      <tbody>
      {filterItems.map(room => {
        return (
      <tr key={room._id} onClick={() => this.ShowRoomDesc(room._id)} className={
          room.Occupied ? 'Occupied' : ''}>
        <td>{room.RoomNumber}</td>
        <td>{room.Floor}</td>
        <td>{this.trimwords(room.Description,15) }</td>
        <td>{room.Occupied ? 'Nej':'Ja'}</td>
        <td>{room.Price} Kr</td>
      </tr>
        )
      })
    }
        </tbody >
      </table>
      </div>
      <label>Visa endast lediga rum </label>
      <input type="checkbox" name="isOccupied" checked={this.state.filter}  onChange={this.handleChange}/>
        </div>
      )
    }
  }
export default Home;