// Valid ID - check if req.param.id is a mongo ID

const { ObjectID } = require('mongodb')

module.exports = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send()
  }

  next()
}
