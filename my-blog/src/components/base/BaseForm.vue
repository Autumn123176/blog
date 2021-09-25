<template>
  <el-form ref="elForm" :model="form" >
    <el-form-item
      v-for="item in formData"
      :key="item.query"
      :label="item.label"
      :prop="item.query"
      :rules="validates[item.query]"
      label-width="80px"
    >
      <el-upload
        v-if="item.type === 'avatar'"
        class="avatar-uploader"
        ref="upload"
        :headers="{
          Authorization: `Bearer ${$store.state.token}`,
        }"
        :action="userFileAction"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload"
      >
        <el-image
          style="width: 100px; height: 100px"
          v-if="form[item['query']]"
          :src="form[item['query']]"
          class="avatar"
          fit="fit"
        ></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-input
        v-if="['text', 'password'].includes(item.type)"
        v-model="form[item['query']]"
        :type="item.type"
        :placeholder="item.placeholder"
        :name="item.query"
        :readonly="item.readonly"
        autocomplete="off"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
// import base from "@/config/base.config";
// import store from "store";
import VALIDATE_DATA from "@/config/validate.config";
import FORM_DATA from "@/config/form.config";
// import { createNamespacedHelpers } from "vuex";
// const { mapState } = createNamespacedHelpers("modal");
// let { TOKEN_NAME } = base;
export default {
  name: "BaseForm",
  created() {
    if (this.type === "userInfo") {
      console.log(this.form);
      // console.log(this.$store.state.userInfo);
      //为什么  state拿到里面有值 ,而 直接userInfo 确是个空
      // this.reset()
      this.form = Object.fromEntries(
        Object.entries(this.$store.getters.UserInfo).filter(([key]) => {
          return FORM_DATA[this.type].find((item) => {
            return item.query === key;
          });
        })
      );
      console.log(this.form);
    }
  },
  mounted() {},
  data() {
    return {
      form: {},
      // isCreated: true,
    };
  },
  props: {
    type: {
      type: String,
    },
  },
  computed: {
    // ...mapGetters(['getUserInfomation']),
    formData() {
      return FORM_DATA[this.type];
    },
    validates() {
      return VALIDATE_DATA;
    },

    userFileAction() {
      return "http://127.0.0.1:3000/upload/user";
    },
  },
  watch: {
    type() {
      this.initForm();
    },
  },
  methods: {
    // reset() {
    //   this.isCreated = false;
    //   this.$nextTick(function () {
    //     this.isCreated = true;
    //   });
    // },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    initForm() {
      //重置表单字段 以及校验状态
      this.form = {};
      this.resetForm();
    },
    handleAvatarSuccess(res) {
      this.form.avatar = res.data.fileURL;
      // NProgress.done();
    },
    handleAvatarError(err) {
      this.$notify.error({
        title: "上传失败",
        message: JSON.parse(err.message)?.message,
      });
    },
    beforeAvatarUpload(file) {
      console.log(this.$refs);
      // 上传前 限制文件大小和文件类型
      let { size, type } = file;
      console.log(type);
      let isPass = true;

      isPass = /image/g.test(type) && size < 5 * 1024 * 1024;

      // console.log(isPass)
      if (!isPass) {
        let errMsg = /image/g.test(type) ? "文件不得大于5M" : "请选择图片文件";
        this.$notify.error({
          title: "上传错误",
          message: errMsg,
        });
        this.$refs.upload[0].abort(file);
        return false;
      }
      // NProgress.start();
    },
  },
};
</script>

<style>
</style>