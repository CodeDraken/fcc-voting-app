// prod.js - production keys

module.exports = {
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },

  mongoURI: process.env.MONGO_URI,

  cookieKey: process.env.COOKIE_KEY
}
