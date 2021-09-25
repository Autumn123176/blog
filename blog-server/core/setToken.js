const jwt = require('jsonwebtoken')
const {getPrivateKey} = require('./rsaControl')

async function setToken (userInfo) {
  //token 携带的信息为 用户名和 _id (后期可用于获取用户信息)
  let { username, _id } = userInfo


  let privateKey = await getPrivateKey()
  let token = jwt.sign({ username, _id, exp: ~~((Date.now() / 1000) + 24 * 3600 * 3) }, privateKey, { algorithm: 'RS256' });
  return token
}
module.exports = setToken