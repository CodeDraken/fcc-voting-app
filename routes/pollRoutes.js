// pollRoutes - poll API routes
// all routes are api/route

const express = require('express')

const requireLogin = require('../middleware/requireLogin')
const validId = require('../middleware/validId')
const pollRouter = express.Router()

const pollController = require('../controllers/pollController')

// vote on a poll
pollRouter.patch('/polls/:id', validId, pollController.vote)

// get a single poll
pollRouter.get('/polls/:id', validId, pollController.getPoll)

// delete a poll
pollRouter.delete('/polls/:id', validId, requireLogin, pollController.deletePoll)

// get all polls
pollRouter.get('/polls', pollController.getPolls)

// create a poll
pollRouter.post('/polls', requireLogin, pollController.newPoll)

module.exports = pollRouter
