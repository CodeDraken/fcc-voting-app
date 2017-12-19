const mongoose = require('mongoose')
const { Schema } = mongoose

// users -
const userSchema = new Schema({
  username: {
    type: String
  },

  githubId: {
    type: String
  },

  avatarUrl: String
})

module.exports = mongoose.model('User', userSchema)
