<template>
  <van-nav-bar
    :title="$route.meta.title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
  <van-button type="primary" size="small" slot="right">评论</van-button>
  </van-nav-bar>
</template>

<script>
export default {
  name: "MHeader",
  data() {
    return {
    };
  },
  watch: {
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },

    onClickRight() {
      this.$eventBus.$emit("focus");
    },
  },
};
</script>

<style>
</style>