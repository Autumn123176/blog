<template>
  <van-tabs v-model="active">
    <van-tab :title="column.name" v-for="column in columns" :key="column._id"> 
      <MArticleList :columnId="column._id"/>
    </van-tab>
  </van-tabs>
</template>

<script>
import MArticleList from './MArticleList'
export default {
  name:'MColumn',
  components:{
    MArticleList
  },
  data() {
    return {
      columns:[],
      active: 0,
    };
  },
  created() {
    this.getColumns();
  },
  methods: {
    async getColumns() {
      let result = await this.$api({ type: "columns" });
      this.columns = result.list.map((item) => {
        return { name: item.name, value: item.aids.length, _id: item._id };
      });
    },
  },
};
</script>

<style>
</style>