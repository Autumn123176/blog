<template>
  <div class="live2d-wrap hidden-md-and-down"
       :class="{right:$store.state.live2dDis}">
    <div class="live2d-menu">
      <span class="live2d-menu--item"><i class="el-icon-refresh"
           @click="changeModel"></i></span>
      <span class="live2d-menu--item"><i class="el-icon-goods"
           @click="changeTextures"></i></span>
    </div>
    <canvas id="live2d"
            width="300"
            height="300"></canvas>

  </div>
</template>

<script>
import '@/static/js/live2d'
import axios from 'axios'
import store from 'store'
const LIVE2D_MODEL_NAME = 'ua_live2d'
const GET_URL = 'https://live2d.fghrsh.net/api/get/'
const MODEL_URL = 'http://api.fghrsh.net/live2d/switch/'
const TEXTURES_URL = 'https://api.fghrsh.net/live2d/rand_textures/'
export default {
  name: 'Live2d',
  data () {
    return {
      modelId: 1,
      texturesId: 0,
    };
  },
  created () {
    let { modelId = 4, texturesId = 0 } = store.get(LIVE2D_MODEL_NAME)
    this.modelId = modelId
    this.texturesId = texturesId
  },
  mounted () {
    this.loadModel()
  },
  methods: {
    async changeModel () {
      try {
        let result = await axios.get(`${MODEL_URL}?id=${this.modelId}`)
        let model = result.data?.model
        this.modelId = model.id
        this.loadModel()
      } catch (err) {
        this.resetModel()
      }

    },
    async changeTextures () {
      try {
        let result = await axios.get(`${TEXTURES_URL}?id=${this.modelId}`)
        this.texturesId = result.data?.textures.id
        this.loadModel()
      } catch (err) {
        this.resetModel()
      }
    },
    resetModel () {
      this.modelId = 1
      this.texturesId = 0
      this.loadModel()
    },
    loadModel () {
      window.loadlive2d('live2d', `${GET_URL}?id=${this.modelId}-${this.texturesId}`)
      store.set(LIVE2D_MODEL_NAME, { modelId: this.modelId, texturesId: this.texturesId })
    }
  },
};
</script>

<style lang="stylus" >
.live2d-wrap
  position fixed
  right 0
  bottom 10px
  width 300px
.live2d-wrap.right
  right 0
.live2d-wrap:hover .live2d-menu
  display flex
.live2d-menu
  position absolute
  top 20px
  left 20px
  display none
  flex-direction column
  align-items center
  justify-content space-around
  width 40px
  height 80px
  padding 8px
  background-color #fff
  border-radius 20px
.live2d-menu--item
  padding 4px
  cursor pointer
</style>