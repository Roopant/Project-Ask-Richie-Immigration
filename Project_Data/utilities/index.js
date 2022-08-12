const joi = require('joi')

const isValidContactMessage=(ContactMessage)=>{
    const schema = joi.object({                   //schema is defining validation structure of object NewContactMessage
        Name : joi.string().min(3).max(40).required(),
        Email_Address: joi.string().min(3).max(40).email().required(),
         Subject:joi.string().min(3).max(50).required(),
         Message: joi.string().min(3).max(200).required(),
    })    
    const {error,value}=schema.validate(ContactMessage)
    return {error,value}              // basically value is sanitising the data sent by user for eg- if he sends 12 elements, this value will only send object of only these 4 elements defined in joi schema.
}

module.exports={isValidContactMessage}