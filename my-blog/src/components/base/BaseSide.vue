<template>
  <el-card shadow="always" class="blog-aside--card" v-if="isLogin">
    <el-avatar
      class="blog-user"
      shape="circle"
      :size="50"
      :src="UserInfo.avatar"
      fit="cover"
      @click.native="go"
    ></el-avatar>
    <p class="mt10">{{ UserInfo.nickname }}</p>
    <div class="blog-aside--body mt10">
      <div class="blog-aside--article">
        <p>{{ UserInfo.articleCount }}</p>
        <p>文章</p>
      </div>
      <div class="blog-aside--column">
        <p>{{ UserInfo.columnCount }}</p>
        <p>分类</p>
      </div>
    </div>
    <p class="blog-aside--signature mt10">{{ UserInfo.signature }}</p>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
// import store from 'store'
export default {
  name: "BaseSide",
  computed: {
    ...mapGetters(["UserInfo"]),
    isLogin() {
      return !!Object.keys(this.$store.state.userInfo).length > 0
    },
  },

  methods: {
    go() {
      if (this.$route.path !== "/user") {
        this.$router.push("/user");
      }
    },
  },
};
</script>

<style lang="stylus">
.blog-aside--card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  text-align: center;
  margin: 10px auto;
  max-height: 540px;
  overflow: hidden;

  &:nth-child(n ) {
    margin-top: 10px;
  }
}

.blog-aside--body {
  display: flex;
  justify-content: space-between;
  // width 50%
}

.blog-user {
  cursor: pointer;
}
</style>