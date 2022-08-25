const UserModel = require('../db/models').User
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers

  if (token === 'null') 
  {
    
    res.json({message:'Please login'})
    return
  }
  
  const payload = jwt.verify(token, process.env.JWT_SECRET)

 /* if (!payload) {
    res.redirect('/html/login.html')
    return
  }*/

  const user = await UserModel.findOne({ email: payload.email }).exec()

  /*if (!user) {
    res.redirect('/html/login.html')
  }*/

  if (!req.loggedInUser) {
 
    Object.defineProperty(req,'loggedInUser',{
      value: user,
      writable:false
       })

  }
next()
}catch(e){
  res.status(500).send(e.message)}

} 
module.exports = {auth}