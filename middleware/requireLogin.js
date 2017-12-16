// require login on authenticated only routes
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must login!' })
  }
}
