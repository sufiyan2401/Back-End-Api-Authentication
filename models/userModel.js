const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

let userModel = mongoose.model("user",userSchema)
module.exports = userModel 
