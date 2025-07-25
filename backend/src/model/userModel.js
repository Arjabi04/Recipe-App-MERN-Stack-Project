const mongoose = require('mongoose')

// schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is requied'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },

},{timestamps:true}) 

module.exports = mongoose.model('user',userSchema)