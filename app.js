const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { mongoURI } = require('./config/keys')
const authRoutes = require('./routes/authRoutes')

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useMongoClient: true }, () => {
  console.log(`Connected to MongoDB at: ${mongoURI}`)
})

const app = express()

// 3rd party middlewares
app.use(bodyParser.json())

// authentication routes
app.use('/auth', authRoutes)

module.exports = app
