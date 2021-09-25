export default {
  namespaced:true,
  state:{
    isShow:false,
    type:''
  },
  mutations:{
    CLOSE(state){
      state.type = ''
      state.isShow = false
    },
    OPEN(state){
      state.isShow = true
    },
    CHANGE_TYPE(state,type){
      state.type = type
    }

  },
  actions:{
    close({commit}){
      commit("CLOSE")
    },
    open({commit},type){
      commit('CHANGE_TYPE',type)
      commit('OPEN')
    },
    // submit(){
    //   console.log('提交')
    // }
  },
  getters:{}
}