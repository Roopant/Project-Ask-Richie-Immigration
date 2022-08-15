const QuestionModel= require('../db/models').Question

const getQuestion= (req,res)=>{
    res.send('get one question')
}

const getQuestions= async (req,res)=>{
    try{
    const Questions = await QuestionModel.find().exec()
    res.send(Questions)}
catch(e){
    res.status(500).send(e.message)
}}


const postQuestion= async (req,res)=>{
    try{ 
        const Question = req.body 
        console.log(Question)
        const NewQuestion = await QuestionModel.create(Question)
        res.send(NewQuestion) 
       return
    }
     catch(e){
        res.status(500).send(e.message)
    }}


const editQuestion= async (req,res)=>{
res.send('edit que, post/edit/delete reply to que')
}    


const deleteQuestion =(req,res)=>{res.send('deleted question')}

/*const postReply =(req,res)=>{res.send('posted reply to question')}
const editReply=(req,res)=>{res.send('edited reply to questions')}
const deleteReply =(req,res)=>{res.send('deleted reply to question')}*/





module.exports={getQuestion,getQuestions,editQuestion,deleteQuestion,postQuestion}