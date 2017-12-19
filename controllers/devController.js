const devController = {
  clear: {
    session (req, res) {
      req.session = null

      res.send('Session Cleared!')
    }
  }
}

module.exports = devController
