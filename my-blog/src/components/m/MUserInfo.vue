<template>
  <div class="blogm-user">
    <div class="blogm-header-user">
      <van-uploader
        :max-size="5 * 1024 * 1024"
        v-model="upload"
        :before-read="beforeRead"
        :after-read="afterRead"
        :preview-image="false"
      >
        <van-image
          round
          width="60"
          height="60"
          :src="avatar"
          fit="cover"
        ></van-image>
      </van-uploader>
      <van-button @click="logout">退出登录</van-button>
    </div>

    <MForm :formType="'userInfo'" ref="mForm" v-if="isCreated" />
    <van-button @click="onSubmit">提交</van-button>
    <van-button @click="reset">重置</van-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MForm from "./Mform.vue";
export default {
  name: "MUserInfo",
  components: {
    MForm,
  },
  data() {
    return {
      upload: [],
      fileBase: "",
      isCreated: true,
      // type:'userInfo'
    };
  },
  created() {
    this.login();
  },
  computed: {
    ...mapGetters(["UserInfo"]),
    avatar() {
      return this.fileBase || this.UserInfo?.avatar;
    },
  },

  methods: {
    onSubmit(){

      let vForm = this.$refs.mForm.$refs.form
      vForm.validate().then(async ()=>{
        let formData = this.$refs.mForm.form
        await this.$api({type:'putUserInfo',data:formData})
        this.$toast.success("修改成功");
        this.$store.dispatch('getUserInfo')
      }).catch(err=>err)
    },
    logout(){
      this.$store.commit('CLEAN_TOKEN')
    },
    reset() {
      this.isCreated = false;
      this.$nextTick(function () {
        this.isCreated = true;
      });
    },
    // reset() {
    //   // console.log(this.$refs.mForm.$refs.form.validate)
    // },
    ...mapActions(["login"]),
    beforeRead(file) {
      let { size, type } = file;
      console.log(type);
      let isPass = true;

      isPass = /image/g.test(type) && size < 5 * 1024 * 1024;

      // console.log(isPass)
      if (!isPass) {
        let errMsg = /image/g.test(type) ? "文件不得大于5M" : "请选择图片文件";
        this.$toast.fail(errMsg);
        // this.$refs.upload[0].abort(file);
      }
      return isPass;
    },
    async afterRead(upload) {
      let formData = new FormData();
      formData.append("file", upload.file);
      try {
        let result = await this.$api({
          type: "uploadUser",
          data: formData,
        });
        this.fileBase = result.fileURL;
        this.$toast.success("头像上传成功");
      } catch (err) {
        this.$toast.fail("上传失败");
        console.log(err);
      }
    },
  },
};
</script>

<style lang="stylus">
.blogm-header-user
  display flex
  justify-content space-between
  align-items center
  width 100vw


</style>