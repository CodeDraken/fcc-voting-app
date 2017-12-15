const mongoose = require('mongoose')
const { Schema } = mongoose

// users -
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  githubId: {
    type: String,
    required: true
  },

  avatarUrl: String
})

module.exports = mongoose.model('User', userSchema)
