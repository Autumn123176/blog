const { decrypt, encrypt, generateKeys } = require('../core/util')
const fs = require('fs').promises
const fsSync = require('fs')
const { pubKeyPath, priKeyPath } = require('../config')

module.exports = {
  //获取
  getPublicKeySync () {
    return fsSync.readFileSync(pubKeyPath, 'utf8')
  },
  async getPublicKey () {
    let key
    try {
      key = await fs.readFile(pubKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = await fs.readFile(pubKeyPath, 'utf8')
    }
    return key
  },
  async getPrivateKey () {
    let key
    try {
      key = await fs.readFile(priKeyPath, 'utf8')
    } catch (err) {
      generateKeys()
      key = await fs.readFile(priKeyPath, 'utf8')
    }
    return key
  }
}
