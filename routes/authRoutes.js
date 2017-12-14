// authRoutes - handles authentication
// all routes are auth/route

const passport = require('passport')
const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/authController')

// authRouter.get('/login')

authRouter.get('/logout', authController.logout)

// start GitHub signin
authRouter.get('/github', passport.authenticate('github'))

// GitHub callback
authRouter.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  authController.githubCallback
)

module.exports = authRouter
