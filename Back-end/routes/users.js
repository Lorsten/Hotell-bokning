//Route for creating new users and validating users

var express = require('express');
var users = require('../scheme-user')
var db = require('../scheme');
var router = express.Router();



/* get the user data based on the username. */
router.get('/authentication/:username', function(req, res, next) {
    users.findOne({ UserName: req.params.username}, function(err, data){
    if(err) return console.error(err);
    res.json(data);
  });
});
/* Get the id of a username and the id of the room if it exists  */
router.get('/getID/:username', function(req, res, next) {
  users.find({UserName:req.params.username}, {_id:1, Room:1}, function(err, data){
  if(err){
    return console.error(err); 
  } 
  else{
    res.json(data);
  }
});
});
/* Get the username and and the populate room if it exists  */
router.get('/getuserRoom', function(req, res, next) {
  users.find({}, {UserName:1,_id:1, Room:1},). populate('Room').exec(function (err, data){
  if(err){
    return console.error(err); 
  } 
  else{
    res.json(data);
  }
});
});
//Get all usernames
router.get('/getusers', function(req, res, next) {
  users.find({}, {UserName:1}, function(err, data){
  if(err){
    return console.error(err); 
  } 
  else{
    res.json(data);
  }
});
});
//Create new user
router.post('/CreateUser', function(req, res, next) {
  let user = new users({
    UserName: req.body.Username,
    password: req.body.password,
  })
  user.save(function(err){
      if (err) {console.error(err)
     res.send(err);
     return
      }
      else{
        res.redirect("/");
      }
    });
  });
  //Delete user
  router.delete('/deleteUser/:id', function (req,res,next) {
    users.deleteOne({
      _id: req.params.id
    }, function (err) {
      if (err) return console.error(err);
    });
    res.send("User deleted");
  });
  //populate the Room referenceing the room in the user collections with the hotel data from the other collection
  router.get('/reservation/:id', function (req, res, next) {
    users.findOne({ _id:req.params.id }).
    populate('Room').exec(function (err, data) {
      if (err) return console.error(err);
      else{
        res.json(data);
      }
    });
    });
    //Set the reference array from hotel_rooms to null in the user collections
    router.put('/reservation/:id', function (req,res,next) {
      users.updateOne({
        _id: req.params.id
      }, {Room: null}, function (err) {
        if (err) return console.error(err);
      });
      //Set the Occupied to false in hotel_rooms collection to make room empty and Guest to null aswell
      db.updateOne({_id: req.body.RoomID },{
        Occupied:false, Guest:null},
        function(err){
          if(err) return handleError(err);
        });
      res.send("Room deleted from user");
    });

    //Add a 1:1 relation between user and hotel_rooms with an objectid which reference the other collection
    router.put('/Addroom/:id', function(req,res,next){

      users.updateOne({_id: req.params.id},{
        Room:req.body.Room },
        function(err){
          if(err) return handleError(err);
        });
        //Set the hotel room occupied to true and add the user object_id to Guest referencing the user 
        db.updateOne({_id: req.body.Room },{
          Occupied:true, Guest:req.params.id},
          function(err){
            if(err) return handleError(err);
          });
      res.redirect("/");
    });
    
module.exports = router;
