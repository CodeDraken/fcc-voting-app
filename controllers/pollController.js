const mongoose = require('mongoose')

const {Poll} = require('../models')

// TODO: clean up logs

const updateVote = (poll, userVote, choice) => {
  // already voted - update it
  poll.choices[userVote.vote].votes--
  poll.choices[choice].votes++

  // update user's vote
  poll.votes[poll.votes.indexOf(userVote)].vote = choice

  return poll
}

const removeVote = (poll, userVote) => {
  console.log('remove vote')
  const voteIndex = poll.votes.indexOf(userVote)
  const choice = poll.choices[userVote.vote]
  poll.votes.splice(voteIndex, 1)
  choice.votes--
  poll.totalVotes--
}

const createVote = (poll, voter, choice) => {
  console.log('create vote', voter, choice)
  // new vote
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
      const polls = await Poll.find()

      res.send(polls)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async getPoll (req, res) {
    // get one poll by id
    try {
      const {id} = req.params

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
      const {title, choices} = req.body
      const poll = await new Poll({
        title,
        choices,
        votes: [],
        _owner: req.user.id,
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
      const {id} = req.params

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
      const {id} = req.params
      let {choice} = req.body
      const isChoiceObj = typeof choice === 'object'
      const poll = await Poll.findOne({
        _id: id
      })
      const existingChoice = isChoiceObj && poll.choices.filter(ch => ch.value === choice.value)[0]
      let userVote = poll.votes.filter(vote => vote._user.equals(req.user._id)
      )[0]

      // remove existing vote
      if (userVote) removeVote(poll, userVote)

      // when an object is passed for choice instead of an index
      if (isChoiceObj && existingChoice) {
        console.log('existing choice object', existingChoice, poll.choices.indexOf(existingChoice))
        // choice exists so just use its index
        choice = poll.choices.indexOf(existingChoice)
      } else if (isChoiceObj && !existingChoice) {
        console.log('new choice')
        // create new choice and vote
        poll.choices.push(choice)
        choice = poll.choices.length - 1
      }

      // add vote
      createVote(poll, req.user._id, choice)
      // if (userVote && userVote.vote !== choice) {
      //   console.log('update vote')
      //   updateVote(poll, userVote, choice)
      // } else if (!userVote) {
      //   console.log('create vote')
      //   createVote(poll, req.user._id, choice)
      // }

      const updatedPoll = await poll.save()

      return res.send(updatedPoll)
    } catch (error) {
      console.log(error)
      return res.status(500)
    }
  }
}

module.exports = pollController
