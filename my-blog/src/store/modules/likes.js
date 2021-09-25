/* eslint-disable no-empty-pattern */
import store from "store"
import base from '@/config/base.config'

import Vue from "vue"

const { LIKES_NAME } = base
export default {
  namespaced: true,
  state: {
    likes: store.get(LIKES_NAME) || [],
  },
  getters: {
    isLike: (state) => (aid) => {
      // console.log(aid)
      return !!(state.likes?.includes(aid))
    }
  },
  mutations: {
    CHNAGE_LIKES(state) {
      state.likes = store.get(LIKES_NAME).filter((item,idx,arr)=>arr.indexOf(item) === idx) || []
    },
    PUSH_LIKE(state, aid) {
      state.likes?.push(aid)
    },
    PULL_LIKE(state, aid) {
      let idx = state.likes?.findIndex(item => item === aid)
      if (idx !== -1) {
        state.likes?.splice(idx, 1)
      }
    }
  },
  actions: {
    pushLike({ commit, state }, aid) {
      commit('PUSH_LIKE', aid)
      store.set(LIKES_NAME, state.likes)
      commit('CHNAGE_LIKES')
      // console.log(this.$api)
    },
    pullLike({ commit, state }, aid) {
      commit('PULL_LIKE', aid)
      store.set(LIKES_NAME, state.likes)
      commit('CHNAGE_LIKES')
    },
    async sendLikes({ }, aid) {
      await Vue.prototype.$api({
        type: 'articleLikes', data: {
          id: aid
        }
      })
    }
  },
}