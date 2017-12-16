const mongoose = require('mongoose')
const { Schema } = mongoose

const voteSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vote: { type: Number, required: true }
})

const choiceSchema = new Schema({
  value: { type: String, required: true },
  votes: { type: Number, default: 0 }
})

const pollSchema = new Schema({
  title: { type: String, required: true },
  totalVotes: { type: Number, default: 0 },

  choices: [ choiceSchema ],

  votes: [ voteSchema ],

  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  createdAt: Date
})

module.exports = mongoose.model('Poll', pollSchema)
