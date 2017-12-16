const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')

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
        _owner: req.user.id,
        createdAt: Date.now()
      }).save()

      res.send(poll)
    } catch (err) {
      res.status(422).send(err)
    }
  },

  async deletePoll (req, res) {
    // delete poll and send back the deleted
    try {
      const { id } = req.params

      if (!ObjectID.isValid(id)) return res.status(404).send()

      const poll = await Poll.findOneAndRemove({
        _id: id,
        _owner: req.user._id
      })

      return res.send(poll)
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  }
}

module.exports = pollController
