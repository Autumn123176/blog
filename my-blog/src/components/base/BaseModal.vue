<template>
  <div class="blog-modal">
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      width="60%"
      :before-close="close"
    >
      <BaseForm ref="form" :type="type" />
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="handler(btn.targetName)"
          v-for="btn in btns"
          :key="btn.targetName"
        >
          {{ btn.val }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import isMobile from '@/core/isMobile'
import BaseForm from "./BaseForm.vue";
import MODAL_DATA from "@/config/modal.config";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("modal");
export default {
  name: "BaseModal",
  data() {
    return {};
  },
  computed: {
    ...mapState(["isShow", "type"]),
    title() {
      return MODAL_DATA[this.type]?.title;
    },
    // formType() {
    //   return MODAL_DATA[this.type]?.formType;
    // },
    btns() {
      return (
        MODAL_DATA[this.type]?.btns ?? [
          {
            targetName: "submit",
            val: "提交",
          },
          {
            targetName: "close",
            val: "取消",
          },
        ]
      );
    },
  },
  mounted() {},
  methods: {
    ...mapActions(["close", "submit"]),
    handler(name) {
      if (name === "submit") {
        this.submitForm();
      } else {
        this[name] && this[name]();
      }
    },
    close() {
      // console.log(this.$store);
      this.$store.dispatch("modal/close");
    },
    restForm() {
      console.log(this.$refs);
      this.$refs["form"].$refs["elForm"].resetFields();
    },
    submitForm() {
      let ref = this.$refs["form"];

      ref.$refs["elForm"].validate(async (valid) => {
        if (valid) {
          try {
            // console.log(this.$refs.form)
            await this.$api({ type: this.type, data: ref.form });
            await this.$store.dispatch("login");
            // console.log(123);
            this.restForm();
            await this.$store.dispatch('online')
            this.$notify.success({
              titile: "成功",
              message: "登录成功",
              duration: 1500,
            });
            this.close();
          } catch (err) {
            this.restForm();
            console.log(err);
          }
          // console.log(valid)
          // alert("submit!");
        } else {
          // console.log(valid)
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  components: { BaseForm },
};
</script>

<style lang="stylus">
.blog-modal
  position relative
  z-index 99999999
</style>