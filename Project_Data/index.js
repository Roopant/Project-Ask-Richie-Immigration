/*Import Statements*/
require('dotenv').config()  //run .env config

//Connect to Mongo Cloud db
require('./db')() // This will automatically require index.js from folder db and by () it will call it here

const express = require('express')
const app = express()
const cors = require ('cors')

const port =process.env.PORT || 3000

const {getContactMessages,createNewContactMessage,updateContactMessage,deleteContactMessage,getContactMessage}=require('./controllers').contactusmessage
const{getQuestion,getQuestions,editQuestion,deleteQuestion,postQuestion}=require('./controllers').question

app.set('viewengine','pug') // no need to require pug separately, this would automatically do that
app.set('views','./views')

/*MiddleWares*/

app.use(express.static('public'))

app.use(express.json()) //middleware between client requests and endpoints of server & parse strings sent.For example- JSON is being transmitted as string to server, this function would parse that JSON string to object to use its functionality and assign it to "body"key of request.

app.use(express.urlencoded({ extended: true }))



/*Server-Side Rendered Page through PUG*/

app.get('/Immigrate',(req,res)=>{
res.render('immigrate.pug',{})
})

/*CRUD operations for Contact Us Form Page Messages Endpoints*/
app.get('/api/v1/contact-messages',getContactMessages)
app.get('/api/v1/contact-messages/:id',getContactMessage)
app.post('/api/v1/contact-messages',createNewContactMessage) //POST endpoint to add a new contact us message from contact us form
app.patch('/api/v1/contact-messages/:id',updateContactMessage) //PATCH endpoint to update a contact us message
app.delete('/api/v1/contact-messages/:id',deleteContactMessage) ///DELETE endpoint to delete a contact us message

/*CRUD operations for forum questions and replies endpoints*/
 app.route('/api/v1/forum-questions/:id')
.get(getQuestion)
.patch(editQuestion)
//.patch(postReply)
//.patch(editReply)
//.patch(deleteReply)
.delete(deleteQuestion)

app.route('/api/v1/forum-questions')
.get(getQuestions)
.post(postQuestion)


/*Catch All Endpoints*/
app.get('*',(req,res)=>{
res.status(404).send('404 Not Found')
})

/*Start Server*/
app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})

