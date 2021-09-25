<template>
  <el-row class="blog-header--row">
    <el-col :span="2" :offset="1">
      <el-image
        class="blog-header--img"
        style="width: 50px; height: 50px"
        :src="require('@/assets/logo.jpg')"
        fit="cover"
      ></el-image>
    </el-col>
    <el-col :span="10" class="hidden-xs-only" :offset="2">
      <el-menu
        mode="horizontal"
        class="blog-menu--nav"
        :router="true"
        :default-active="routePath"
      >
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/column">分类</el-menu-item>
        <el-menu-item index="/games">亿点小游戏</el-menu-item>
        <el-menu-item index="/socket">聊天</el-menu-item>
        <el-menu-item v-if="$store.state.userInfo.nickname" index="/user"
          >个人信息</el-menu-item
        >
      </el-menu>
    </el-col>
    <el-col :span="4" >
       <el-input class="blog-input--search"
                placeholder="搜索文章"
                v-model="searchVal"
                @keydown.native.enter="activeSearch">
        <i slot="suffix"
           v-show="searchVal"
           class="el-input__icon el-icon-search"
           @click="activeSearch"></i>
      </el-input>
    </el-col>
    <el-col :span="2" class="hidden-xs-only" :offset="2">
      <component :is="compType"></component>
    </el-col>
  </el-row>
</template>

<script>
import UserLogin from "@/components/user/UserLogin";
import Useravatar from "@/components/user/UserAvatar";
export default {
  name: "BaseHead",
  components: {
    UserLogin,
    Useravatar,
  },
  data() {
    return {
      searchVal:''
    };
  },
  methods:{
    activeSearch(){
      if(this.searchVal.trim().length === 0) {
        return
      }
      this.$eventBus.$emit('search',this.searchVal)
    }
  },
  computed: {
    // ...mapState(['token']),
    
    routePath() {
      return this.$route.meta.path;
    },
    token() {
      return this.$store.state.token;
    },
    compType() {
      //todo  根据token 来切换组件
      return this.token ? "Useravatar" : "UserLogin";
    },
  },
};
</script>

<style lang="stylus">
.blog-header--row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.blog-menu--nav.el-menu {
  box-sizing: border-box;
  background-color: skyblue;
}

.blog-header--img {
  overflow: hidden;
  border-radius: 50%;
}

.blog-input--search
  max-width 240px

</style>