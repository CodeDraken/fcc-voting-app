const authController = {
  githubCallback (req, res) {
    res.redirect('/')
  },

  currentUser (req, res) {
    res.json(req.user)
  },

  logout (req, res) {
    // kills the cookie
    req.logout()
    res.redirect('/')
  }
}

module.exports = authController
