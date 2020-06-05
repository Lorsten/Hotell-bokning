import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Edit from "./Edit";
import Add_rom from "./Add_room";
import Edit_page from './Edit_page';
import Login from './Login';
import PrivateRoute from './Routes';
import Nav from './Nav';
import Home from './Home';
import RoomDesc from './Room_desc';
import Register from './Register';
import Reservation from './Reservation';
import Users from './Users';
import AdminRoute from './AdminRoute';


class App extends React.Component{

  render(){
  return(
    <div id='wrapper'>
      <div id="header">
        <h1>Hotellet av olof</h1>
      </div>
    <BrowserRouter>
    <Nav />
    <div id="main-section">
      <Switch>
      <Route exact path="/">
      <Redirect to="/Home" />
     </Route>
      <Route  exact path="/Home" component={Home}/>
      <AdminRoute path="/Edit" component={Edit}/>
      <AdminRoute path="/Add_rom" component={Add_rom} />
      <AdminRoute path="/users" component={Users} />
      <Route  path="/Edit_page/:id" component={Edit_page}/>
      <Route  path="/Room_desc/:id" component={RoomDesc}/>
      <Route  path="/Register" component={Register}/>
      <PrivateRoute  path="/Reservation" component={Reservation}/>
      <Route  path="/Login" component={Login}/>
      </Switch>
      </div>
    </BrowserRouter>
    </div>
  )
  }
}
export default App;

