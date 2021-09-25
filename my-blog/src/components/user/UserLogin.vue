<template>
  <div class="blog-header--login">
    <span @click="open('login')">登录</span>
    <span>/</span>
    <span @click="open('register')">注册</span>
  </div>
</template>

<script>
// import MODAL_DATA from "@/config/modal.config";
// import { createNamespacedHelpers } from "vuex";

export default {
  name: "UserLogin",
  data() {
    return {

    };
  },
  computed: {
    // ...mapState(["isShow", "type"]),
  },
  methods: {
    open(val){
      this.$store.dispatch('modal/open',val)
    }
  },
};
</script>

<style>
</style>