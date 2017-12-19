const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')

const { mongoURI, cookieKey } = require('./config/keys')
const authRoutes = require('./routes/authRoutes')
const pollRoutes = require('./routes/pollRoutes')

// const fakeUser = require('./middleware/fakeUser')
const anonUser = require('./middleware/anonUser')

// passport config
require('./services/passport')

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useMongoClient: true }, () => {
  console.log(`Connected to MongoDB at: ${mongoURI}`)
})

const app = express()

// attatch property session to req
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [ cookieKey ]
  })
)

// initialize passport
app.use(passport.initialize())

// persistent login sessions
app.use(passport.session())

// 3rd party middlewares
app.use(bodyParser.json())

app.get('/', (req, res) => {
  let ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  res.send({ ip })
})

// DEBUG / DEVELOPING ONLY
// app.use(fakeUser)

// Anonymous auth - if no user then create one
app.use(anonUser)

// authentication routes
app.use('/auth', authRoutes)

// poll api routes
app.use('/api', pollRoutes)

module.exports = app
