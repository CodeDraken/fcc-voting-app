const mongoose = require('mongoose')

const { Poll } = require('../models')

// TODO: clean up logs

// remove a vote and update
const removeVote = (poll, userVote) => {
  // get all votes by the user
  const userVotes = poll.votes.filter(vote => vote._user.equals(userVote._user))

  // remove all votes by the user
  poll.votes = poll.votes.filter(vote => !vote._user.equals(userVote._user))

  // update vote numbers
  userVotes.forEach(vote => poll.choices[vote.vote].votes--)
  poll.totalVotes--
}

// new vote
const createVote = (poll, voter, choice) => {
  poll.choices[choice].votes++

  poll.votes.push({
    _user: voter,
    vote: choice
  })

  poll.totalVotes++

  return poll.votes[poll.votes.length - 1]
}

const pollController = {
  async getPolls (req, res) {
    // get all polls
    try {
      const page = req.query.page || 0
      const polls = await Poll
        .find()
        .skip(page * 10)
        .limit(10)

      res.send({
        page,
        polls
      })
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async getMyPolls (req, res) {
    try {
      const polls = await Poll.find({ _owner: req.user._id })

      res.send(polls)
    } catch (error) {
      res.status(400).send(error)
    }
  },

  async getPoll (req, res) {
    // get one poll by id
    try {
      const { id } = req.params

      const poll = await Poll.findOne({
        _id: id
      })

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
        _owner: req.user._id,
        createdAt: Date.now()
      }).save()

      res.send(poll)
    } catch (err) {
      console.log(err)
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
    // vote on a poll - existing option or create new one
    try {
      const { id } = req.params
      let { choice } = req.body
      const isChoiceObj = typeof choice === 'object'

      const poll = await Poll.findOne({
        _id: id
      })

      // if choice option exists in db grab it
      const existingChoice = isChoiceObj && poll.choices.filter(ch => ch.value === choice.value)[0]

      // if user already voted grab their vote
      let userVote = poll.votes.filter(vote =>
        vote._user.equals(req.user._id)
      )[0]

      // remove existing vote
      if (userVote) removeVote(poll, userVote)

      // when an object is passed for choice instead of an index
      if (isChoiceObj && existingChoice) {
        // choice exists so just use its index
        choice = poll.choices.indexOf(existingChoice)
      } else if (isChoiceObj && !existingChoice) {
        // create new choice and vote
        poll.choices.push(choice)
        choice = poll.choices.length - 1
      }

      // add vote
      createVote(poll, req.user._id, choice)

      const updatedPoll = await poll.save()

      return res.send(updatedPoll)
    } catch (error) {
      console.log(error)
      return res.status(500)
    }
  }
}

module.exports = pollController
