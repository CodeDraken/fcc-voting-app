const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy

const keys = require('../config/keys')

passport.use(
  new GithubStrategy({
    ...keys.github,
    callbackURL: '/auth/github/callback',
    proxy: true
  }),
  () => {

  }
)
