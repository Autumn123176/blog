<template>
  <div class="blog-article--aitem" @click="routeGo">
    <div class="blog-article--header">
      <h3>{{ listItem.title }}</h3>
      <span class="el-icon-timer">{{ listItem.date }}</span>
    </div>
    <el-image
      class="blog-article--pic"
      style="width: 100px; height: 100px"
      :src="listItem.cover"
      fit="cover"
    ></el-image>
    <p class="blog-article-con" v-html="content" v-once></p>
    <div class="blog-article--footer">
      <span class="el-icon-star-off">{{ listItem.like_num }} </span>
      <span class="el-icon-view"> {{ listItem.hit_num }} </span>
      <span class="el-icon-edit"> {{ listItem.comments.length }} </span>
    </div>
  </div>
</template>

<script>


export default {
  name: "ArticleItem",
  props: {
    listItem: {
      type: Object,
    },
  },
  computed: {
    content() {
      return this.listItem.content.slice(0, 22) + "......";
    },
    id(){
      return this.listItem._id
    }
  },
  methods: {
    routeGo() {
      this.$router.push(`/article/${this.id}`);
    },



  },
};
</script>

<style lang="stylus">
.blog-article--aitem :nth-child(n):not(.blog-article--header) {
  margin-top: 6px;
}

.blog-article--header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;

  span {
    margin-left: 30px;
  }
}

.blog-article--footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & :nth-of-type(n) {
    margin-right: 50px;
  }
}
</style>