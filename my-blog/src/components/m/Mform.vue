<template>
  <div>
    <van-form ref="form">
      <van-field
        v-model="form[item.query]"
        v-for="item in formData"
        :key="item.query"
        :type="item.type"
        :name="item.query"
        :label="item.label"
        :readonly="item.readonly"
        :placeholder="item.placeholder"
        :rules="validateArr[item.query]"
      />
    </van-form>
    <div v-if="btnData">
      <van-button
        v-for="item in btnData"
        :key="item.targetName"
        @click="handler(item.targetName)"
      >
        {{ item.val }}</van-button
      >
    </div>
  </div>
</template>

<script>
import FORM_CONFIG from "@/config/form.config";
import VALIDATE_CONFIG from "@/config/validate.config";
import padOn from "@/core/padOn";
import MODAL_CONFIG from "@/config/modal.config";
export default {
  name: "MFrom",
  props: {
    formType: {
      type: String,
    },
  },
  data() {
    return {
      // formData: ,
      form: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  watch: {
    formType() {
      this.initForm();
    },
  },
  computed: {
    formData() {
      return FORM_CONFIG[this.formType].filter(
        (item) => item.query !== "avatar"
      );
    },
    btnData() {
      return MODAL_CONFIG[this.formType]?.["btns"];
    },
    validateArr() {
      return Object.fromEntries(
        Object.entries(VALIDATE_CONFIG).map(([key, val]) => {
          val.forEach((item) => {
            item.trigger = padOn(item.trigger);
          });
          return [key, val];
        })
      );
    },
  },
  methods: {
    async getUserInfo() {
      let result = await this.$store.dispatch("getUserInfo");
      this.form = this.formData.reduce((acc, item) => {
        acc[item.query] = result[item.query] || undefined;
        return acc;
      }, {});
    },
    submit() {
      this.$refs.form.validate().then(async () => {
        try {
          await this.$api({ type: this.formType, data: this.form });
          this.$toast.success("登录成功");
          await this.getUserInfo();
          this.initForm();
        } catch (err) {
          console.log(err);
        }
      }).catch(err=>err);
    },
    handler(val) {
      this[val] && this[val]();
    },
    close() {
      this.initForm();
    },
    initForm() {
      this.form = {};
      this.$refs.form?.resetValidation();
    },
  },
};
</script>

<style>
</style>