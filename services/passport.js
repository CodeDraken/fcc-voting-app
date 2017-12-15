const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy

const keys = require('../config/keys')
const db = require('../models')
const User = db.User

// create cookie with mongodb user ID
passport.serializeUser((user, done) => done(null, user.id))

// get user from cookie
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    console.log('deserialize user error: ', err)
    done(err)
  }
})

// GitHub OAuth
passport.use(
  new GithubStrategy({
    ...keys.github,
    callbackURL: '/auth/github/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    // save user
    try {
      console.log({
        githubId: profile.id,
        username: profile.username,
        avatarUrl: profile._json.avatar_url
      })

      const existingUser = await User.findOne({ githubId: profile.id })

      if (existingUser) {
        return done(null, existingUser)
      }

      const user = await new User({
        githubId: profile.id,
        username: profile.username,
        avatarUrl: profile._json.avatar_url
      }).save()

      return done(null, user)
    } catch (error) {
      console.log('GitHub auth error: ', error)
      return done(error)
    }
  })
)
