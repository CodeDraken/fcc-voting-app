# FCC Voting App
A voting app project for [FreeCodeCamp](https://www.freecodecamp.org/)

View it at: https://arcane-atoll-78026.herokuapp.com/

Keep in mind this is just an educational project - one that was rushed a little bit so I didn't bother with the design much or to make it *perfect*.

## Some of the tech used:
* Back-End: NodeJS, Express, MongoDB
* Front-End: React, Redux

## Running on local server
1. Have Node installed and clone the repo

2. in your console run `npm start` or `npm start-watch` for live reloading with Nodemon.

3. Make a `dev.js` file in the config folder for secret keys. It looks like this:

```js
// development keys - dont commit this file!

module.exports = {
  github: {
    clientID: 'yourClientID',
    clientSecret: 'yourSecret'
  },

  mongoURI: 'mongodb://localhost:27017/VotingApp',
  
  cookieKey: 'someSecretStringForCookies'
}

```

### npm Commands
  `start` - starts the server

  `start-watch` - starts the server with nodemon ( live reload )

  `test` - runs tests

  `test-watch` - tests with reloading

  `client` - start the client

  `dev` - start the client and the server using concurrently
  
  `lt` - start a localtunnel server
