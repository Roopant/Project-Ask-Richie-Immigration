const mongoose = require('mongoose')

//Schema
const contactusmessageSchema = new mongoose.Schema({
      Name: {
        type : String,
        required : [true, 'Name is required'],
        min :3,
        max :40
      },
      Email_Address :{
        type : String,
        required : [true, 'Emailaddress is required'],
        min :3,
        max :40
      },
      Subject: {
        type : String,
        required : [true, 'Subject is required'],
        min :3,
        max :50
      },
      Message :{
        type : String,
        required : [true, 'Message is required'],
        min :3,
        max :200
      }

})
//Schema

 //Model           
const ContactUsMessage = mongoose.model('ContactUsMessage',contactusmessageSchema)

module.exports= ContactUsMessage