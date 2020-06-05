import React from 'react';
import Axios from 'axios';



class ShowUsers extends React.Component{
  constructor(props){
    super(props);
    this.state = ({date:new Date(),
    apiResponse:[],
    message:'',
    showMsg:false,
    messageMembers:'Inga medlemar registerade'});

    this.handleClick = this.handleClick.bind(this);
    }

   // Function for getting all the rooms occupied by a member and insert into a new array execept for the admin at index 0

    componentDidMount() {
      //Get all the data from the server
      Axios.get(`https://fast-scrubland-80308.herokuapp.com/users/getuserRoom`)
        .then(res => {
          const apiResponse = res.data;
          this.setState({apiResponse});
          this.getUserRooms(res.data);

        })
        .catch(err =>{
          console.log(err);
        })
      }
    handleClick(id,Roomid){
            //Delete user
            Axios.delete(`https://fast-scrubland-80308.herokuapp.com/users/deleteUser/${id}`)
            .then(res => {
              console.log(res);
              console.log(res.data)
            })
            .catch(err =>{
              console.log(err);
            })
            let copyApiResponse = this.state.apiResponse
            for(let i = 0; i < copyApiResponse.length; i++){
              let api = copyApiResponse[i];
                if(api._id === id){
                copyApiResponse.splice(i,1)
                break
              }
            }
            this.setState({
              message:'Användare Raderad',
              showMsg:true,
              apiResponse:copyApiResponse
         
            })
            //Room id is larger than 0 update the room Occuipied to false
            if(Roomid.length > 0){
              Axios.put(`https://fast-scrubland-80308.herokuapp.com/hotel/Occupied/${Roomid}`)
              .then(res => {
                console.log(res);
                console.log(res.data)
              })
              .catch(err =>{
                console.log(err);
              })
            }
          }
    render(){
      return(
        <div id="Data-container">
        <h2>Alla registerade användare</h2>
        {this.state.showMsg ? <h3>{this.state.message}</h3>: ''}
        {this.state.apiResponse.length < 1 ? <h3>{this.state.messageMembers}</h3>: ''}
        <div id="table-user">
        <table key='user-table'>
          <thead>
            <tr>
              <th>Användare</th>
              <th>Rum bokat</th>
              <th>Ta bort</th>
            </tr>
          </thead>
          <tbody>
      {//Show all users except Admin
      this.state.apiResponse.filter(u => u.UserName !=='Admin').map(users => {
        return (
          <tr key={users._id} className='userlist'>
        <td>{users.UserName}</td>
        {users.Room.length > 0? 
         <td>{users.Room[0].RoomNumber}</td>:  <td>Nej</td>}
        <td> <button onClick={() => {if(window.confirm("Säkert på att du vill radera användare "+users.UserName +"?")) {users.Room.length > 0 ? this.handleClick(users._id,users.Room[0]._id): this.handleClick(users._id,0)};}}>Ta bort</button></td>
        </tr>
        )
      }
      )
    }
    </tbody>
      </table>

      </div>
      </div>
      )
    }
  }

 
export default ShowUsers;