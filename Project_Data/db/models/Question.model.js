const mongoose = require('mongoose')

//Schema
const questionSchema = new mongoose.Schema({
      question: {
        type : String,
        required : [true, 'question text is required'],
        min :5,
        max :512
      },
      reply :{
        type : String,
        min :5,
        max :512,
        default: ''
      },


})
//Schema

 //Model           
const Question = mongoose.model('Question',questionSchema)

module.exports= Question