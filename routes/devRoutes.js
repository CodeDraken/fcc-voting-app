// devRoutes - utils for developing should not be used in prod
// all routes are dev/route

const express = require('express')

const devRouter = express.Router()
const devController = require('../controllers/devController')

// clear session
devRouter.get('/clear/session', devController.clear.session)

// delete all polls
devRouter.get('/clear/polls', devController.clear.polls)

module.exports = devRouter
