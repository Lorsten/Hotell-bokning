import React from "react";
import Axios from 'axios';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    Price: '',
    isOccupied: false,
    RoomNumber: '',
    apiResponse:[],
    Description: 'Enkel säng',
    data: "",
    userMsg:'',
    showMsg:false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  //Get the room data to check if room already exists
  componentDidMount(){
    Axios.get(`https://fast-scrubland-80308.herokuapp.com/hotel`)
    .then(res => {
      const apiResponse = res.data;
      this.setState({apiResponse});
    }
    )
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
   
    this.setState({
      [name]: value
  })
}
  handleInputChange(event){
   const target = event.target;
   const value = target.name === 'isOccupied' ? target.checked : target.value;
   const name = target.name;

   this.setState({
    [name]: value
  });
  }
  handleSubmit(event) {
    //Check if description is less than 10
    if(this.state.Description.length < 10){
      this.setState({
        showMsg:true,
        userMsg:'Din beskrivning måste vara minst 10 tecken'
      })
      event.preventDefault();
      return;
    }
    if(this.state.RoomNumber.length < 3){
      this.setState({
        showMsg:true,
        userMsg:'Du måste fylla i ett rum'
      })
      event.preventDefault();
      return;
    }
    else if(this.state.Price.length < 3){
      this.setState({
        showMsg:true,
        userMsg:'Du måste fylla i ett pris'
      })
      event.preventDefault();
      return;
    }
          //Check if apiresponse is not empty
          if(this.state.apiResponse.length > 1){
            //Use a for loop to check if roomnumber already exists
          for(let i = 0; i < this.state.apiResponse.length; i++){
            if(parseInt(this.state.RoomNumber) === this.state.apiResponse[i].RoomNumber){
              //SHow error message if room exists by setting state 
              this.setState({
                showMsg:true,
                userMsg:'Rummet '+this.state.RoomNumber +' finns redan, försök igen'
              })
              event.preventDefault();
              return;
          }
        }
          }
    const room = {
      RoomNumber: this.state.RoomNumber,
      //get the first char from roomnumber to get the floor, example 300 == 3
      Floor: parseInt(this.state.RoomNumber.charAt(0)),
      Description: this.state.Description,
      Price:this.state.Price
    };
    Axios.post('https://fast-scrubland-80308.herokuapp.com/hotel', room)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
   this.setState({
    userMsg:'Rum skapat!',
    showMsg:true
   })
   event.preventDefault();
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
          <h2>Lägg till ett nytt rum</h2>
          <h4>{this.state.showMsg ? this.state.userMsg : ''}</h4>
        <label>
         Rumsnummer(från 100 till 400):
          <input type="number" name='RoomNumber' min="100" max="400" value={this.state.RoomNumber}
          onChange={this.handleInputChange} />
        </label>
          <label>
         Pris(minst 500kr):
          <input type="number" name='Price' min="500" value={this.state.Price}
          onChange={this.handleInputChange} />
        </label>
    
     
        <label>
         Beskrivning(minst 10 tecken):
          <textarea name='Description' col="15" rows="10"value={this.state.Description} onChange={this.handleChange}></textarea>
        </label>
        <input type="submit" value="Lägg till rum" />
        <p>{this.state.data}</p>
      </form>
    );
  }
}
export default Form;
   



