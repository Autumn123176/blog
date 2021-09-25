import axios from 'axios'
import store from 'store'
import base from '@/config/base.config.js'

let { BASE_URL, TIMEOUT, TOKEN_NAME }  = base
const server = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})

server.interceptors.request.use(async (config) => {
  //请求拦截器
  let token = store.get(TOKEN_NAME)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

server.interceptors.response.use((response) => {
  //剥离最外层
  let result = response.data
  console.log(result)
  return result?.data;
}, (error) => {
  return Promise.reject(error);
});




export default server