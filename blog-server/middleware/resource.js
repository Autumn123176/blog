const createError = require('http-errors')
const { classify } = require('inflection')
//改写成大写且消除负数形式
module.exports = options => {
  return async (req, res, next) => {
    const modelName = classify(req.params.resource)
    try {
      req.Model = require(`../models/${modelName}`)
      next()
    } catch (err) {
      next(createError(404))
    }
  }
}