const mongoose = require('mongoose')
const { Schema } = mongoose

const pollSchema = new Schema({
  title: { type: String, required: true },
  totalVotes: { type: Number, default: 0 },

  choices: [{
    value: { type: String, required: true },
    votes: { type: Number, default: 0 }
  }],

  voters: [{
    _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vote: { type: Number, required: true }
  }],

  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Poll', pollSchema)
