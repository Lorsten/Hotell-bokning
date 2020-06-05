var express = require('express');
var db = require('../scheme');
var router = express.Router();


//Writing out only the post based on the id
router.get('/:id', function (req, res, next) {
  db.findOne({_id: req.params.id}, function (err, data) {
    if(err){
      return console.error(err); 
    } 
    else{
      res.json(data);
    }
  });
  });
/* GET users listing. */
router.get('/', function (req, res, next) {
  db.find({}, function (err, data) {
    res.json(data);
  });
});
// Insert new post
router.post('/', function (req, res, next) {

  let room = new db({
    RoomNumber: req.body.RoomNumber,
    Floor: req.body.Floor,
    Description: req.body.Description,
    Price: req.body.Price
  })
  room.save(function (err) {
    if (err) {console.error(err)
      res.send(err);
      return
       }
       else{
         res.redirect("/");
       }
     });
   });
//Delete a Room
router.delete('/:id', function (req,res,next) {
  db.deleteOne({
    _id: req.params.id
  }, function (err) {
    if (err) return console.error(err);
  });
  res.send("Room deleted");
});
// Update a room based on id
router.put('/:id', function(req,res,next){

  db.updateOne({_id: req.params.id},{
    Description: req.body.Description,
    Price: req.body.Price },
    function(err){
      if(err) return handleError(err);
    });
  res.redirect("/");
});
// Update a room to empty
router.put('/Occupied/:id', function(req,res,next){
  db.updateOne({_id: req.params.id},{
    Occupied: false},
    function(err){
      if(err) return handleError(err);
    });
  res.redirect("/");
});
module.exports = router;