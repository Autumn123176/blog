<template>
  <div class="blogm-page">
    <MHeader/>
    <!-- <van-notice-bar
      wrapable
      left-icon="volume-o"
      text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    /> -->
    <div class="blogm-content">
      <router-view></router-view>
    </div>

    <MFooter />
  </div>
</template>

<script>
import MFooter from "./MFooter.vue";
import MHeader from "./MHeader.vue";

export default {
  name: "MHome",
  methods: {},
  components: {
    MFooter,MHeader
  },
};
</script>

<style lang="stylus">
.blogm-content
  overflow hidden
  overflow-y auto
  height calc(100vh - 105px)
  background-color #f1f1f1

</style>