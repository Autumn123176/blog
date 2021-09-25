<template>
  <div class="blogm-user">
    <ul class="blogm-login-register">
      <li
        v-for="(val, name) in typeData"
        :key="name"
        @click="changeType(name)"
        :class="{ active: type === name }"
      >
        {{ val }}
      </li>
    </ul>
    <MForm  :formType="type"/>
  </div>
</template>

<script>
// import FORM_CONFIG from "@/config/form.config";
// import VALIDATE_CONFIG from "@/config/validate.config";
// import padOn from "@/core/padOn";
// import MODAL_CONFIG from "@/config/modal.config";
import MForm from "./Mform.vue";
export default {
  name: "MLogin",
  components: {
    MForm,
  },
  data() {
    return {
      type: "login",
      typeData: {
        login: "登录",
        register: "注册",
      },
    };
  },

  methods: {
    changeType(val) {
      this.type = val;
    },
  },
};
</script>

<style lang="stylus">
.blogm-login-register {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

  li {
    width: 50vw;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    text-align: center;
    border-radius: 6px;

    &.active {
      background-color: orange;
    }
  }
}
</style>