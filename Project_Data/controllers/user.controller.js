const UserModel =require('../db/models').User
const bcrypt = require('bcryptjs')

const register=async(req,res)=>{
try{
const {email,password}=req.body
const passwordHash = await bcrypt.hash(password,10)
const user =await UserModel.create({email,passwordHash}) 
res.send(user)
}catch(e)
  {res.status(500).send(e.message)}
}

const login=async(req,res)=>{
   try{
     const {email,password}=req.body
    const user= await UserModel.findOne({email}).exec()
    if(!user) {
        res.status(401).send('Incorrect email or password')
        return
    }
     const isValidpassword= await bcrypt.compare(password,user.passwordHash)
     
    if(!isValidpassword){
        res.status(401).send('Incorrect email or password')
        return
    }
     res.send('valid access +token')
   } catch(e)
     {res.status(500).send(e.message)}
}

module.exports={register,login}