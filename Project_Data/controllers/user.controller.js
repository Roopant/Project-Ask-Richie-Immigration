const UserModel =require('../db/models').User
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        res.status(401).send({message:'Incorrect email or password'})
        return
    }
     const isValidpassword= await bcrypt.compare(password,user.passwordHash)
     
    if(!isValidpassword){
        res.status(401).send({message:'Incorrect email or password'})
        return
    }
     const token = jwt.sign({email},process.env.JWT_secret,{expiresIn:'1h'})
     res.send({token})
   } catch(e)
     {res.status(500).send(e.message)}
}

module.exports={register,login}