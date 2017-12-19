const authController = {
  githubCallback (req, res) {
    res.redirect('/')
  },

  currentUser (req, res) {
    if (req.user && req.user.githubId) {
      // send authenticated user
      res.json(req.user)
    } else if (req.user) {
      // anonymous user
      res.json({
        _id: req.user,
        username: 'Anonymous',
        githubId: null,
        avatarUrl: null
      })
    }
  },

  logout (req, res) {
    // kills the cookie
    req.logout()
    res.redirect('/')
  }
}

module.exports = authController
