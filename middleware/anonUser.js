// anonUser - create anonymous user on session to use ID for creation later
// DEBUGGING / DEV ONLY

const passport = require('passport')
const mongoose = require('mongoose')

const db = require('../models')
const User = db.User

//
const anonUser = (req, res, next) => {
  console.log('session: ', req.session)
  const hasPassportUser = req.session.passport && req.session.passport.user

  if (!req.session.user && !req.user && !hasPassportUser) {
    // no anonymous user set && user not logged in
    req.session.user = new User()._id

    req.user = {
      _id: req.session.user,
      username: 'Anonymous',
      githubId: null,
      avatarUrl: null
    }
  } else if (req.session.user && !req.user) {
    // we created an anonymous user, but we need to set it on req.user
    req.user = {
      _id: req.session.user,
      username: 'Anonymous',
      githubId: null,
      avatarUrl: null
    }
  }

  // commented out to avoid infinite anonymous voting by logging in / out
  // user logged in - remove anonymous user
  // if (req.session.passport.user) {
  //   delete req.session.user
  // }

  next()
}

module.exports = anonUser
