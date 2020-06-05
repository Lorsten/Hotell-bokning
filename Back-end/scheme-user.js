//Create schema for users Having a unique username
const mongoose = require("./db_connect");
const Schema = mongoose.Schema;

var User = new Schema ({
    UserName: { type: String,
        required:true,
        unique:true},
        password: { type: String, required: true },
        Room: [{
            type: Schema.Types.ObjectId, ref: 'hotel_rooms'
        }]
});
var CollectionName = "Users";
module.exports = mongoose.model("Users", User, CollectionName);
