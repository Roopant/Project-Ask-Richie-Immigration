const QuestionModel= require('../db/models').Question



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
        const {question ,reply} = req.body 
        const createdBy =req.loggedInUser.email
        const NewQuestion = await QuestionModel.create({question,reply,createdBy})
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

      const questionInfo = await QuestionModel.findById(_id).exec()

      if(req.loggedInUser.email!==questionInfo.createdBy) {
        res.status(401).send('you do not have access to edit this question')
         return
    }

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
   
    if (!_id) res.status(404).send('Not Found')

    const questionInfo = await QuestionModel.findById(_id).exec()

    if(req.loggedInUser.email!==questionInfo.createdBy) {
      res.status(401).send('you do not have access to delete this question')
       return  
    }

   await QuestionModel.findByIdAndDelete(_id).exec()
    res.send({message:`Question with id ${_id} has been deleted successfully`})
  } catch (e) {
    res.status(500).send(e.message)
  }
}


module.exports={getQuestions,editQuestion,deleteQuestion,postQuestion}