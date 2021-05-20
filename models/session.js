const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({

 instructor : {
     type : String
 },
topic : {
    type : String, 
    required : true
},
date : {
    type : String,
    required : true
},
startTime : {
    type : String,
    required : true
},
duration : {
    type : String,
    required : true
},
studentsAttending : {
    type : Array,
    default : []
}

});

module.exports = mongoose.model("session",sessionSchema )
