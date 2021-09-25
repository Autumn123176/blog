<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>
    <BaseForm ref="form" :type="type" v-if="isCreated && $store.state.userInfo._id" />
    <div class="user-btn">
      <el-button type="success" @click="submit">提交</el-button>
      <el-button type="primary" @click="reset">重置信息</el-button>
    </div>
  </el-card>
</template>

<script>
import BaseForm from "@/components/base/BaseForm";
export default {
  name: "UserInfo",
  components: {
    BaseForm,
  },
  data() {
    return {
      isCreated: true,
    };
  },
  computed: {
    type() {
      return "userInfo";
    },
  },
  created() {
    // this.reset();

    this.$store.commit("modal/CHANGE_TYPE", "userInfo");
    if (Object.keys(this.$store.state.userInfo).length === 0) {
      this.$store.dispatch("login");
    }

    // console.log(this.$store.state);
  },
  methods: {
    submit() {
      let refForm = this.$refs["form"];
      refForm.$refs["elForm"].validate(async (valid) => {
        if (valid) {
          try {
            await this.$api({ type: "putUserInfo", data: refForm.form });
            this.$store.dispatch("getUserInfo");
            this.$notify.success({
              title: "消息",
              message: "修改成功",
            });
            this.$router.push("/index");
          } catch (err) {
            this.$notify.error({
              title: "消息",
              message: "修改失败",
            });
            refForm.$refs["elForm"].resetFields();
          }
        } else {
          return false;
        }
      });
    },
    reset() {
      this.isCreated = false;
      this.$nextTick(function () {
        this.isCreated = true;
      });
    },
  },
};
</script>

<style lang="stylus">
.user-btn
  display flex
  justify-content center
</style>