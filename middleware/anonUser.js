// anonUser - create anonymous user on session to use ID for creation later
// DEBUGGING / DEV ONLY

const passport = require('passport')
const mongoose = require('mongoose')

const db = require('../models')
const User = db.User

//
const anonUser = (req, res, next) => {
  console.log('session: ', req.session)

  if (!req.session.user && !req.user && !req.session.passport.user) {
    // no anonymous user set && user not logged in
    req.session.user = new User()

    req.user = req.session.user
  } else if (req.session.user && !req.user) {
    // we created an anonymous user, but we need to set it on req.user
    req.user = req.session.user
  }

  // commented out to avoid infinite anonymous voting by logging in / out
  // user logged in - remove anonymous user
  // if (req.session.passport.user) {
  //   delete req.session.user
  // }

  next()
}

module.exports = anonUser
