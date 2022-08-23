const UserModel = require('../db/models').User
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers

  if (token === null || token === undefined) {
    res.send('Please login')
    return
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET)

  if (!payload) {
    res.redirect('/html/login.html')
    return
  }

  const user = await UserModel.findOne({ email: payload.email }).exec()

  if (!user) {
    res.redirect('/html/login.html')
  }

  if (!req.loggedInUser) {
 
    Object.defineProperty(req,'loggedInUser',{
      value: user,
       })

  }
next()
}catch(e){
  res.status(500).send('Please login to continue')}

} 
module.exports = {auth}