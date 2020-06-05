const mongoose = require("./db_connect");
const Schema = mongoose.Schema;

var room = new Schema ({
    RoomNumber: { type: Number,
        required:true,
        unique:true},
    Floor:Number,
    Description:String,
    Occupied: {
        Type:Boolean, 
        default:false
    },
    Price:Number,
    Guest: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});
var CollectionName = "hotel_rooms";
module.exports = mongoose.model("hotel_rooms", room, CollectionName);
