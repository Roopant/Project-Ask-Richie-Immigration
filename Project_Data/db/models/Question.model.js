const mongoose = require('mongoose')

//Schema
const questionSchema = new mongoose.Schema({
      question: {
        type : String,
        required : [true, 'question text is required'],
        minlength: 5,
        maxlength: 512
      },
      reply :{
        type : String,
        default: '',
        
      },
      createdBy : {
        type :mongoose.Schema.Types.String
      }

})
//Schema

 //Model           
const Question = mongoose.model('Question',questionSchema)

module.exports= Question