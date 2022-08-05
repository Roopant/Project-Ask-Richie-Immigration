require('dotenv').config()

const {CreateNewContactMessage, isValidContactMessage,UpdateContactMessage} = require('./utilities/functions')

const express = require('express')
const app = express()

const PORT =process.env.PORT || 3000

const ContactMessages = require('./messages-from-contact-us.json')

app.use(express.json()) //middleware between client requests and endpoints of server & parse strings sent.For example- JSON is being transmitted as string to server, this function would parse that JSON string to object to use its functionality and assign it to "body"key of request.
//app.use(express.urlencoded())

/*GET endpoint or routes*/

app.get('/Immigrate',(req,res)=>{
res.send('You Can Immigrate to Canada in following ways')
})

app.get('/api/v1/contact-messages',(req,res)=>{
res.send(ContactMessages)
})

app.get('/api/v1/contact-messages/:id',(req,res)=>{
    const {id} = req.params
    const filteredMessage=ContactMessages.filter(contactmessage=>contactmessage.id==id) // this filter method would return a new array of object whos id match with our id in URL endpoint,after checking each object in existing array.
    if (filteredMessage.length===0){
        res.status(404).send(`No message with this id ${id}`)
        return
    }
    res.send(filteredMessage[0])
    })

/*POST endpoint to add a new contact us message from contact us form*/
app.post('/api/v1/contact-messages',(req,res)=>{
    const NewContactMessage = req.body // Receive new message data from request body-(test JSON data from thunderclient POST request which is first parsed by middleware)/ in real we will use data from contact-us form
    const {error,value} =isValidContactMessage(NewContactMessage)
    if(!error){
    CreateNewContactMessage(NewContactMessage,ContactMessages)
    res.send(NewContactMessage) // This object would automatically be sent as JSON string response to client but we console log this NewContactMessage on terminal,it would still be object
       return}

     res.status(422).send(error.details[0].message)
    })


/*PATCH endpoint to update a contact us message*/
app.patch('/api/v1/contact-messages/:id',(req,res)=>{
    const {id} =req.params
    const ContactMessage = req.body 
    const index = ContactMessages.findIndex(contactmessage=>contactmessage.id==id)
    if(index ===-1)
    { res.status(404).send (`No contact message to update with this id ${id}`)}
    const {error,value} =isValidContactMessage(ContactMessage)
    if(!error){
     const UpdatedContactMessage= UpdateContactMessage(ContactMessage,ContactMessages,index)
    res.send(UpdatedContactMessage) 
       return}
     res.status(422).send(error.details[0].message)
    })


/*Catch All Endpoints*/
app.get('*',(req,res)=>{
res.status(404).send('Not Found')
})


/*Start Server*/

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})