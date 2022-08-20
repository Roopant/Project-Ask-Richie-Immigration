const UserModel = require('../db/models').User
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const { authorization: token } = req.headers

  if (!token) {
    res.status(401).send('unauthorized')
    return
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET)

  if (!payload) {
    res.status(401).send('unauthorized')
    return
  }

  const user = await userModel.findOne({ email: payload.email }).exec()

  if (!user) {
    res.status(401).send('unauthorized')
  }

  next()
}

module.exports = auth