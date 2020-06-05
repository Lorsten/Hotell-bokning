import React from "react";
import Axios from 'axios';


class Editroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      Price: '',
      isOccupied: false,
      Description: '',
      Number: '', 
      userMsg:'',
      showMsg:false
  
   };
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleInputChange = this.handleInputChange.bind(this);
 }

 componentDidMount(){
  Axios.get(`https://fast-scrubland-80308.herokuapp.com/${this.state.id}` )
  .then(res => {
    this.setState({
    Description: res.data.Description,
    Price: res.data.Price,
    isOccupied: res.data.Occupied,
    Number: res.data.RoomNumber});
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
  this.setState({
    showMsg:true,
    userMsg:'Rummet har ändrats'
  })

  const data = {
    Description: this.state.Description,
    Price:this.state.Price,
  };
  Axios.put(`https://fast-scrubland-80308.herokuapp.com/hotel/${this.state.id}`, data )
  .then(res => {
    console.log(res);
    console.log(res.data);
  })

 event.preventDefault();
}

  render(){
  
    return (

      <form onSubmit={ this.handleSubmit}>
      <h2>Ändrar rum {this.state.Number}</h2>
        <h4>{this.state.showMsg ? this.state.userMsg : ''}</h4>
      <div className="form-container">
        <label>
       Välj pris (kr)/natt:
        <input type="number" name='Price' value={this.state.Price}
        onChange={this.handleInputChange} />
      </label>
      </div>
      <div className="form-container">
      </div>
      <label>
       Ändra beskrivning:
        <textarea name='Description' col="15" rows="10"value={this.state.Description} onChange={this.handleChange}></textarea>
      </label>
      <input type="submit" value="Ändra rum" />
      <p>{this.state.data}</p>
    </form>

    )
}
}

export default Editroom;
   



