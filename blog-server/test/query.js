const express = require('express')
const router = express.Router()
const qs = require('qs')
router.get('/', (req, res, next) => {
  let {query} = req.query
  // query = qs.parse(query)

  console.log(query)
  console.log(query.q)

  res.send(200, {
    query,
  })
})


module.exports = router