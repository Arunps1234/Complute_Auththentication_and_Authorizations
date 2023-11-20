const mongoose = require("mongoose");

mongoose.connect(`${process.env.MDB_URL}/auth`).then(res => {
    console.log("Connected to databse successfully")
}).catch(err => {
    console.log(err)
})