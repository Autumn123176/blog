<template>
  <component :is="userComp"></component>
</template>

<script>
// import base from "@/config/base.config";
import MUserInfo from "@/components/m/MUserInfo";
import MLogin from "@/components/m/MLogin";
// let { TOKEN_NAME } = base;
export default {
  name: "MUser",
  components: {
    MUserInfo,
    MLogin,
  },
  data() {
    return {

    };
  },
  // watch: {
  //   isUser(val) {
  //     if (val) {
  //       this.userComp = "MUserInfo";
  //     } else {
  //       this.userComp = "MLogin";
  //     }
  //   },
  // },
  computed: {
    userComp() {
      return Object.keys(this.$store.state.userInfo).length ? 'MUserInfo' : 'MLogin'
    },
  },
};
</script>

<style>
</style>