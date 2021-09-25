<template>
  <div class="blog-page">
    <el-container class="blog-container">
      <!-- 默认高度 60px -->
      <el-header class="blog-header">
        <BaseHead />
      </el-header>
      <el-container class="blog-middle">
        <el-row type="flex" justify="space-between">
          <el-col :span="16" :offset="2" :xs="{ span: 24, offset: 0 }">
            <el-main width="80%" class="blog-main">
              <myScroll ref="scrollView" @handle-scroll="loadMore">
                <router-view :loading="loading" v-if="isShow"></router-view>
              </myScroll>
            </el-main>
          </el-col>
          <el-col :span="6" class="hidden-xs-only">
            <el-aside width="100%">
              <BaseSide />
            </el-aside>
          </el-col>
        </el-row>
      </el-container>
      <!-- <el-footer height="10vh">4</el-footer> -->
    </el-container>
    <BaseModal />
    <BaseCircleMenu :menuList="circleList" />
    <Live2D />
  </div>
</template>

<script>
import BaseHead from "@/components/base/BaseHead";
import BaseModal from "@/components/base/BaseModal";
import BaseSide from "@/components/base/BaseSide";
import _ from "loadsh";
import BaseCircleMenu from "@/components/base/BaseCircleMenu";
import CircleMenuConfig from "@/config/circleMenu.config";
import Live2D from "@/components/Live2d";
// import base from "@/config/base.config";

// import store from "store"
// let { LIKES_NAME } = base;
// import { Store } from 'vuex';
const TH = 200;
export default {
  name: "Home",
  components: { BaseHead, BaseModal, BaseSide, BaseCircleMenu, Live2D },
  data() {
    return {
      loading: false,
      isShow: true,
      circleList: [],
    };
  },
  created() {
    this.circleList = CircleMenuConfig[this.$route.name]?.() || [];
  },
  // mounted() {
  //   // console.log(this.$refs['main']);
  //   // console.log(this.$store.state);
  //   window.onbeforeunload = function () {
  //     localStorage.removeItem(LIKES_NAME);
  //   };

  //   // window.onload = () => {
  //   //   if (this.$route.name !== "index") {
  //   //     this.$router.replace("/index");
  //   //   }
  //   // };
  // },
  provide() {
    return {
      closeLoadClock: this.closeLoadClock,
    };
  },
  // mounted() {

  // },
  watch: {
    $route(to) {
      this.circleList = CircleMenuConfig[to.name]?.() || [];
      this.loading = true;
      this.reload();
      
    },
  },
  beforeDestroy() {
    // store.remove(LIKES_NAME)
    // console.log(store.get(LIKES_NAME))
  },
  methods: {
    reload() {
      
      this.isShow = false;
      this.$nextTick(function () {
        this.isShow = true;
        // console.log(_.throttle)
      });
    },
    closeLoadClock() {
      this.loading = false;
    },
    loadMore: _.throttle(
      function (vertical, horizontal, nativeEvent) {
        this.scrollTop = vertical.scrollTop;
        if (this.loading) {
          return;
        }
        let st = vertical.scrollTop;
        let sh =
          nativeEvent.srcElement.scrollHeight -
          nativeEvent.srcElement.clientHeight;
        if (st + TH > sh) {
          this.loading = true;
        }
      },
      500,
      false
    ),
  },
};
</script>

<style lang="stylus" scoped>
.blog-container {
  overflow: hidden;
  height: 100%;
}

.blog-header {
  padding: 0;
  background-color: skyblue;
}

.blog-middle, .el-row {
  width: 100%;
}

.blog-main {
  height: 80vh;
  overflow: hidden;
}
</style>