<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.isMobile() && this.$router.replace('/m') || this.$router.replace('/')
  },
  methods: {
    isMobile() {
      return navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/
      );
    },
  },
};
</script>

<style lang="stylus">
@import '~@/assets/css/base.styl';

html, body {
  overflow: hidden;
  height: 100vh;
}
</style>
