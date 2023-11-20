const mongoose = require("mongoose");

const users = new mongoose.Schema({
    username :  {
        type: String,
        required: true
    },

    phone :  {
        type: String,
        required: true
    },

    email :  {
        type: String,
        required: true
    }, 
    
    refrence : {
        type: String,
        required:true

    }
})

module.exports = mongoose.model("Custermers", users)