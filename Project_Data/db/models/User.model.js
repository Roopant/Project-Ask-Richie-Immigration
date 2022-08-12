const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
      email :{
        type:String,
        required:[true,'email is required'],
        unique:true,
        match :[/^\S+@\S+$/g,'invalid email format'],              // Putting regex expression to match between two forward slashes and g is global 
        min :5,
        max : 128

    },
      passwordHash :{
        type : String,
        required:[true,'password is required'],
        min : 8,
        max :512
      },
      isAdmin :Boolean
      }
)
//Schema

 //Model           
const User = mongoose.model('User',userSchema)

module.exports= User