const uuid= require('uuid')
const joi = require('joi')


const CreateNewContactMessage=(NewContactMessage,ContactMessages)=>{
    const id = uuid.v4()          // Create id 
    NewContactMessage.id=id       // Append id to NewContactMessage Object
    ContactMessages.push(NewContactMessage) // Push this NewContactMessage Object to ContactMessages Array
}

const isValidContactMessage=(NewContactMessage)=>{
    const schema = joi.object({                   //schema is defining validation structure of object NewContactMessage
        Name : joi.string().min(3).max(40).required(),
        Email_Address: joi.string().min(3).max(40).email().required(),
         Subject:joi.string().min(3).max(50).required(),
         Message: joi.string().min(3).max(200).required(),
    })    
    const {error,value}=schema.validate(NewContactMessage)
    return {error,value}              // basically value is sanitising the data sent by user for eg- if he sends 12 elements, this value will only send object of only these 4 elements defined in joi schema.
}

const UpdateContactMessage=(ContactMessage,ContactMessages,index)=>{
   for (let key in ContactMessages[index]) {
    if (ContactMessage[key]){
        ContactMessages[index][key]=ContactMessage[key]
    }
    }
    return ContactMessages[index]
}
    

module.exports={CreateNewContactMessage,isValidContactMessage,UpdateContactMessage}