const express = require('express');
const router = express.Router();
const Key = require('../models/Key')
const { getPublicKey } = require('../core/rsaControl')
router.get('/', async (req, res, next) => {
  try {
    let pubKey = await Key.findOne()
    if (!pubKey) {
      pubKey = await getPublicKey()
      pubKey = await Key.create({ content: pubKey })
    }
    // console.log(result)
    res.send(200, {
      data: {
        pubKey:pubKey.content
      }
    })

  } catch (err) {
    next(err)
  }
});

module.exports = router;
