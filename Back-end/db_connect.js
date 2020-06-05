const mongoose = require('mongoose');
const uri = "mongodb+srv://Dbuser:ReactAppTest5.@cluster0-3z4j8.mongodb.net/hoteldb?retryWrites=true&w=majority";
 mongoose.connect(uri , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,});
// Localhost mongoose.connect('mongodb://localhost:27017/hotel', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,});
var db = mongoose.connection;
db.on('error', console.error, console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("connected");

});

module.exports = mongoose;
