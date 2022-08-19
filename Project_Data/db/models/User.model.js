const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
      email :{
        type:String,
        required:[true,'email is required'],
        unique:true,
        match :[/^\S+@\S+$/g,'invalid email format'],              // Putting regex expression to match between two forward slashes and g is global 
        minLength :5,
        maxLength : 128

    },
      passwordHash :{
        type : String,
        required:[true,'password is required'],
        minLength : 8,
        maxLength :128
      },
      isAdmin :{
        type :Boolean,
        default: false
      }}
)
//Schema

 //Model           
const User = mongoose.model('User',userSchema)

module.exports= User