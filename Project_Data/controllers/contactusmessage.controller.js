//const ContactMessages = require('../messages-from-contact-us.json')

const { isValidContactMessage } = require('../utilities')

const ContactUsMessageModel= require('../db/models').ContactUsMessage

const getContactMessages= async (req,res)=>{
    try{
    const ContactMessages = await ContactUsMessageModel.find().exec()
    res.send(ContactMessages)}
catch(e){
    res.status(500).send(e.message)
}}


const createNewContactMessage= async (req,res)=>{
    try{ const ContactMessage = req.body 
    const {error,value} =isValidContactMessage(ContactMessage)
    if(!error){
    const NewContactMessage = await ContactUsMessageModel.create(value)
    res.send(NewContactMessage) 
       return}
      res.status(422).send(error.details[0].message)
    } catch(e){
        res.status(500).send(e.message)
    }}


const updateContactMessage= async (req,res)=>{
    try{
        const {id} =req.params
    const ContactMessage = req.body 
    const {error,value} =isValidContactMessage(ContactMessage)
    if(!error){
    await ContactUsMessageModel.updateOne({_id:id},value)
    const UpdatedContactMessage= await ContactUsMessageModel.find({_id:id}).exec()
    res.send(UpdatedContactMessage) 
       return}
     res.status(422).send(error.details[0].message)
    }catch(e){
        res.status(500).send(e.message)
    }
}    


const deleteContactMessage= async (req,res)=>{
    try{
    const {id} =req.params
    const ToBeDeletedContactMessage= await ContactUsMessageModel.find({_id:id})
    await ContactUsMessageModel.deleteOne({_id:id})
    res.send(ToBeDeletedContactMessage) }
    catch(e){
        res.status(500).send(e.message)
    }}

const getContactMessage= async (req,res)=>{
        try{
        const {id} =req.params
        const ContactMessage = await ContactUsMessageModel.findById(id).exec()
        res.send(ContactMessage)
     }
        catch(e){
            res.status(500).send(e.message)
        }}
    



module.exports={getContactMessages,createNewContactMessage,updateContactMessage,deleteContactMessage,getContactMessage}