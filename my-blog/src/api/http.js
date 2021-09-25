import server from './common'
import store from 'store'
import API_LIST from '@/config/api.config'
import encrypt from '../core/util'
import base from '@/config/base.config.js'
import isMobile from '@/core/isMobile'
let { TOKEN_NAME } = base
export default async function Http({ type, data }) {
  if (!(type in API_LIST)) {
    throw new Error('API请求错误')
  }
  let { url, method, rsaKey = false, setToken = false, rest = false } = API_LIST[type]

  try {
    method = method.toLowerCase()
    if (rest) {
      // console.log(data[restSymbol])
      let restSymbol = url.match(/:(.*)$/)[1]
      url = url.replace(/:(.*)$/, data[restSymbol])
    }
    if (rsaKey && data[rsaKey]) {
      data[rsaKey] = await encrypt(data[rsaKey])
    }
    data = method === 'get' ? { params: data } : data
    let result = await server[method](url, data)
    if (setToken) {
      let token = result.token
      store.set(TOKEN_NAME, token)
      // this.$store.dispatch('login','userInfo')
    }
    return result
  } catch (err) {
    // console.log(err)

    console.log(err.response)
    if (err.response) {
      if (isMobile()) {
        this.$toast.fail('错误')
      } else {
        let message = err.response.data.message
        this.$notify.error({
          title: '错误',
          message,
          duration: 1500,
        })
      }

    }

    // if(err.response){
    return Promise.reject(err)
    // }
  }

}