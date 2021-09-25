<template>
  <wordcloud
    :data="listWords"
    nameKey="name"
    valueKey="value"
    :color="myColors"
    :showTooltip="false"
    :wordClick="wordClickHandler"
  >
  </wordcloud>
</template>

<script>
import wordcloud from "vue-wordcloud";
export default {
  name: "Column",
  data() {
    return {
      listWords: [],
      myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
    };
  },
  components: {
    wordcloud,
  },
  computed: {},
  created() {
    this.getColumns();
  },
  methods: {
    async getColumns() {
      let result = await this.$api({ type: "columns" });
      this.listWords = result.list.map((item) => {
        return { name: item.name, value: item.aids.length, _id: item._id };
      });
    },

    wordClickHandler(name, value, vm) {
      let columnId = vm.data.filter((item) => (item.name === name))[0]._id;
      console.log(
        vm.data.filter((item) => {
          console.log(item.name)
          return item.name === name;
        })
      );
      this.$router.push({ name: "index", query: { columnId } });
      console.log(this.$route)
    },
  },
};
</script>

<style>
</style>