const QuestionModel= require('../db/models').Question

const getQuestion= (req,res)=>{
    res.send('get one question')
}

const getQuestions= async (req,res)=>{
    try{
    const Questions = await QuestionModel.find().exec()
    res.send(Questions)
     return
    }catch(e){
    res.status(500).send(e.message)
}}


const postQuestion= async (req,res)=>{
    try{ 
        const Question = req.body 
        const NewQuestion = await QuestionModel.create(Question)
        res.send(NewQuestion) 
       return
    }
     catch(e){
        res.status(500).send(e.message)
    }}


const editQuestion= async (req,res)=>{
    try {
      const {_id} = req.params
      const {question,reply} = req.body

      await QuestionModel.updateOne({_id},{question,reply},{runValidators:true}).exec()
      const editedQuestion = await QuestionModel.findById(_id).exec()
      res.send(editedQuestion)
    } catch (e) {
      res.status(500).send(e.message)
    }
  }


const deleteQuestion =async (req,res)=>{
  try {
    const {_id} = req.params
    await QuestionModel.findByIdAndDelete(_id).exec()
    res.send({message:`Question with id ${_id} has been deleted successfully`})
  } catch (e) {
    res.status(500).send(e.message)
  }
}


module.exports={getQuestion,getQuestions,editQuestion,deleteQuestion,postQuestion}