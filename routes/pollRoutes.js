// pollRoutes - poll API routes
// all routes are api/route

const passport = require('passport')
const express = require('express')
const pollRouter = express.Router()

const pollController = require('../controllers/pollController')

pollRouter.get('/polls', pollController.getPolls)

pollRouter.post('/polls', pollController.newPoll)

module.exports = pollRouter
