import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modal'
import store from 'store'
import base from '@/config/base.config'
import router from '../router'
import http from '@/api/http'
import likes from './modules/likes'
import isMobile from '@/core/isMobile'
import { io } from 'socket.io-client'
let { TOKEN_NAME, LIKES_NAME } = base
let actMe = false
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: store.get(TOKEN_NAME) ?? '',
    userInfo: {},
    // articleList: []
  },
  getters: {
    UserInfo(state) {
      return state.token ? state.userInfo : undefined
    },
    // ArticleList(state) {
    //   return state.articleList
    // }
  },
  mutations: {
    GET_USER_INFO(state, list) {
      state.userInfo = list
    },
    SET_TOKEN(state) {
      state.token = store.get(TOKEN_NAME)
    },
    CLEAN_TOKEN(state) {
      state.token = ''

      store.remove(LIKES_NAME)
      store.remove(TOKEN_NAME)

      state.userInfo = {}
    },
    // GET_ARTICLE_LIST(state, result) {
    //   state.articleList = result.list
    // },
  },
  actions: {
    async logout({ commit,state }) {
      actMe = true
      if (!isMobile()) {
        Vue.prototype.$notify.info({
          title: '通知',
          message: `${state.userInfo.nickname}退出登录`
        })
        if (router.app._route.name !== 'index') {
          router.push('/index')
        }
      } else {
        Vue.prototype.$toast.success(`${state.userInfo.nickname}退出登录`)
      }
      // Vue.prototype.$ws?.close()
      commit('CLEAN_TOKEN')
    },
    async online({ commit, state }) {
      Vue.prototype.$ws = io('ws://127.0.0.1:8888', { transports: ['websocket'] })
      console.log(state.userInfo)
      let { _id, nickname } = state.userInfo
      console.log(nickname)
      Vue.prototype.$ws.emit('online', { uid: _id, nickname })

      Vue.prototype.$ws.on('disconnect', () => {
        Vue.prototype.$ws = null
        // let message = `再见 ${nickname}`
        let message = "";
        //如果是被顶掉了
        if (!actMe) {
          message = `账号已在其他设备登录`
        }
        Vue.prototype.$notify.success({
          title: '退出登录',
          message
        })
        actMe = false

        if (router.app._route.name !== 'index') {
          router.push('/index')
        }
        commit('CLEAN_TOKEN')
      })
    },
    async getUserInfo({ commit }) {
      try {
        let result = await http({ type: "getUserInfo" })
        commit('GET_USER_INFO', result)
        // dispatch('online')
        return result
        // console.log(result)
      } catch (err) {
        console.log(err)
      }

    },
    async login({ commit, dispatch }) {
      commit('SET_TOKEN')
      dispatch('getUserInfo')
      // dispatch('online')
    }
    // getToken({commit,dispatch}){

    //   commit('SET_TOKEN')
    // }
  },
  modules: {
    modal, likes
  }
})
