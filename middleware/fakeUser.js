// fakeUser - adds req.user if there is none
// DEBUGGING / DEV ONLY

const mongoose = require('mongoose')

const db = require('../models')
const User = db.User

const fakeUser = (req, res, next) => {
  if (!req.user && process.env.NODE_ENV !== 'production') {
    req.user = new User({
      username: 'Test User',
      githubId: '123abc',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/16908616?s=460&v=4',
      _id: new mongoose.Types.ObjectId('5a356dc4d780fe30537b2e9f')
    })
  }

  next()
}

module.exports = fakeUser
