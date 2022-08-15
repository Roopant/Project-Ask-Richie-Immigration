const mongoose = require('mongoose')

//Schema
const contactusmessageSchema = new mongoose.Schema({
      Name: {
        type : String,
        required : [true, 'Name is required'],
        minLength :3,
        maxLength :40
      },
      Email_Address :{
        type : String,
        required : [true, 'Emailaddress is required'],
        minLength :3,
        maxLength :40
      },
      Subject: {
        type : String,
        required : [true, 'Subject is required'],
        minLength :3,
        maxLength :50
      },
      Message :{
        type : String,
        required : [true, 'Message is required'],
        minLength :3,
        maxLength :200
      }

})
//Schema

 //Model           
const ContactUsMessage = mongoose.model('ContactUsMessage',contactusmessageSchema)

module.exports= ContactUsMessage