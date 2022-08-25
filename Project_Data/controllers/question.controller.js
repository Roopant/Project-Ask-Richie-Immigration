const QuestionModel= require('../db/models').Question



const getQuestions= async (req,res)=>{
    try{
    const Questions = await QuestionModel.find().exec()
    res.send(Questions)
     return
    }catch(err){
    res.status(500).send(err.message)
}}


const postQuestion= async (req,res)=>{
    try{ 
        const {question ,reply} = req.body 
        const createdBy =req.loggedInUser.email
       if(question.length<5)
       { res.json({message:'Validation failed-Please enter minimum 5 characters'})
        return}
      
        const NewQuestion = await QuestionModel.create({question,reply,createdBy})
        res.send(NewQuestion) 
       return
    }
     catch(err){
        res.status(500).json({message:err.message})
    }}


const editQuestion= async (req,res)=>{
    try {
      const {_id} = req.params
      const {question,reply} = req.body

      const questionInfo = await QuestionModel.findById(_id).exec()

      if(req.loggedInUser.email!==questionInfo.createdBy) {
        res.status(401).json({message:'you are not authorised to edit or delete Questions and Replies ,posted by other Users'})
         return
    }

    if(question.length<5)
    { res.json({message:'Validation failed-Please enter minimum 5 characters'})
      return}



      await QuestionModel.updateOne({_id},{question,reply},{runValidators:true}).exec()
      const editedQuestion = await QuestionModel.findById(_id).exec()
      res.send(editedQuestion)
    } catch (err) {
      res.status(500).json({message:err.message})
    }
  }


const deleteQuestion =async (req,res)=>{
  try {
    const {_id} = req.params
   
    if (!_id) res.status(404).send('Not Found')

    const questionInfo = await QuestionModel.findById(_id).exec()

    if(req.loggedInUser.email!==questionInfo.createdBy) {
      res.status(401).json({message:'you are not authorised to edit or delete Questions and Replies ,posted by other Users'})
       return  
    }

   await QuestionModel.findByIdAndDelete(_id).exec()
    res.send({message:`Question with id ${_id} has been deleted successfully`})
  } catch (err) {
    res.status(500).json({message:err.message})
  }
}


module.exports={getQuestions,editQuestion,deleteQuestion,postQuestion}