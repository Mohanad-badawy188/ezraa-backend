
const mongoose = require('mongoose')

var Schema = mongoose.Schema;
let userSchema = new Schema({ 
    name:{type:String , required:true, unique:true},
    email :{type : String , required:true,  unique:true},
    password : {type:String ,   required:true} ,
    isAdmin : {type :Boolean,
    default : false} ,
    img : String
        



},{timestamps:true})

const User = mongoose.model("User", userSchema)


module.exports = User ;