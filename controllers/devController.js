const { Poll } = require('../models')

const devController = {
  clear: {
    session (req, res) {
      req.logout()
      req.session = null

      res.send('Session Cleared!')
    },

    async polls (req, res) {
      try {
        await Poll.remove()

        res.send('Polls removed!')
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
    }
  }
}

module.exports = devController
