<template>
  <transition-group
    class="blog-circle--menu"
    appear
    name="circle"
  >
    <el-button
      class="blog-menu--btn"
      v-for="menu in otherMenu"
      :key="menu.icon"
      :icon="menu.icon"
      circle
      size="medium"
      @click="handlerOrRoute(menu)"
    >
    </el-button>
    <el-button
      v-if="execMenu"
      :class="{ active: isLike }"
      class="blog-menu--btn like"
      :key="execMenu.icon"
      :icon="execMenu.icon"
      circle
      size="medium"
      @click="handlerOrRoute(execMenu)"
    >
    </el-button>
  </transition-group>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("likes");
export default {
  name: "BaseCircleMenu",
  props: {
    menuList: {
      type: Array,
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    isLike() {
      return this.localLike(this.id);
    },
    ...mapGetters({ localLike: "isLike" }),
    execMenu() {
      return this.menuList.filter((item) => item.exce)[0];
    },
    otherMenu() {
      return this.menuList.filter((item) => !item.exce);
    },
  },
  methods: {
    handlerOrRoute(menu) {
      // console.log(menu)
      let { route, handler } = menu;
      if (route) {
        this.$router.push(route);
      }
      if (handler) {
        this[handler] && this[handler]();
      }
    },
    // addColumn(){

    // },
    handlerLikeArticle() {
      this[this.isLike ? "pullLike" : "pushLike"](this.id);
        this.sendLikes(this.id);
    },
    handlerFocusTextarea() {
      this.$eventBus.$emit("focus");
    },
    ...mapActions(["pullLike", "pushLike","sendLikes"]),
  },
};
</script>

<style lang="stylus">
.blog-circle--menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 100px;
  left: 60px;
}

.blog-menu--btn.el-button.el-button--default {
  width: 50px;
  height: 50px;
  padding: 0;
  margin-left: 0;
  margin-bottom: 6px;
  font-size: 26px;
}

.el-button--medium.blog-menu--btn.active.like {
  color: orange;
  border-color: orange;
}

.el-button--medium.blog-menu--btn:active,
.el-button--medium.blog-menu--btn:focus
  background: #FFF;
  border: 1px solid #E8EAEF;
  color: #606266;
  outline: 0;
.circle-enter-active, .circle-leave-active
  transition transform 0.5s ease-in-out
.circle-enter
  transform translateX(-80px)
.circle-leave-to
  transform translateX(0)
</style>