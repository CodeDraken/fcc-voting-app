const mongoose = require('mongoose')

const { Poll } = require('../models')

const pollController = {
  async getPolls (req, res) {
    try {
      const polls = await Poll.find()

      res.send(polls)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async newPoll (req, res) {
    try {
      const { title, choices } = req.body
      const poll = await new Poll({
        title,
        choices,
        votes: [],
        _owner: new mongoose.Types.ObjectId('5a3312e198b4ec0d7f816616'), // req.user.id
        createdAt: Date.now()
      }).save()

      res.send(poll)
    } catch (err) {
      res.status(422).send(err)
    }
  }
}

module.exports = pollController
