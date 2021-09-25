<template>
  <van-search
    v-model="value"
    shape="round"
    placeholder="请输入搜索关键词"
    @search="onSearch"
  />
</template>

<script>
export default {
  name: "MSearch",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSearch() {
      this.$eventBus.$emit("search", this.value);
      this.value = ''
    },
  },
};
</script>

<style>
</style>