<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" :to="{ name: 'mArticleList' }" 
      >首页</van-tabbar-item
    >
    <van-tabbar-item icon="search" :to="{ name: 'mColumn' }"
      >分类</van-tabbar-item
    >
    <van-tabbar-item icon="friends-o" :to="{ name: 'mUser' }"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
  
<script>
export default {
  name: "MFooter",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>