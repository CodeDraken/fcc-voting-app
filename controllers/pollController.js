const mongoose = require('mongoose')

const { Poll } = require('../models')

const pollController = {
  async getPolls (req, res) {
    // get all polls
    try {
      const polls = await Poll.find()

      res.send(polls)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async getPoll (req, res) {
    // get one poll by id
    try {
      const { id } = req.params

      const poll = await Poll.findOne({_id: id})

      return res.send(poll)
    } catch (err) {
      return res.status(500).send(err)
    }
  },

  async newPoll (req, res) {
    // create a new poll
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

      const poll = await Poll.findOneAndRemove({
        _id: id,
        _owner: req.user._id
      })

      return res.send(poll)
    } catch (err) {
      return res.status(500).send(err)
    }
  },

  async vote (req, res) {
    try {
      const { id } = req.params
      const { choice } = req.body

      const poll = await Poll.findOne({ _id: id })

      const userVote = poll.votes.filter(vote =>
        vote._user.equals(req.user._id)
      )[0]

      if (userVote && userVote.vote !== choice) {
        // already voted - update it
        poll.choices[userVote.vote].votes--
        poll.choices[choice].votes++

        // update user's vote
        poll.votes[poll.votes.indexOf(userVote)].vote = choice
      } else if (!userVote) {
        poll.choices[choice].votes++
        // new vote
        poll.votes.push({
          _user: req.user._id,
          vote: choice
        })

        poll.totalVotes++
      }

      const updatedPoll = await poll.save()

      return res.send(updatedPoll)
    } catch (error) {
      return res.status(500)
    }
  }
}

module.exports = pollController
