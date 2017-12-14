const authController = {
  githubCallback (req, res) {
    res.redirect('/')
  },

  currentUser (req, res) {
    res.send(req.user)
  },

  logout (req, res) {
    // kills the cookie
    req.logout()
    res.redirect('/')
  }
}

module.exports = authController
