const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const userSchema = new Schema({

    userName:{
        type:String,
        minlength:1,
        maxlength:20,
    },
    email:{
        type:String,
        require:true,
        unique:true,   
    },
    password:{
        type:String,
        min:1,
        max:9,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})

const userModel= mongoose.model('users',userSchema)
module.exports=userModel;