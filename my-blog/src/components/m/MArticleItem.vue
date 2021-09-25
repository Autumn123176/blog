<template>
  <div class="blogm-article--aitem">
    <div class="blogm-article--header">
      <h3>{{ article.title }}</h3>
      <span class="el-icon-timer">{{ article.date }}</span>
    </div>
    <van-image
      round
      width="100"
      height="100"
      :src="article.cover"
      fit="cover"
    ></van-image>
    <p class="blogm-article-con" v-html="content" v-once></p>
    <div class="blogm-article--footer">
      <div class="blogm-icon">
        <van-icon name="like-o" /><span>{{ article.like_num }}</span>
      </div>
      <div class="blogm-icon">
        <van-icon name="browsing-history-o" /><span>{{ article.hit_num }}</span>
      </div>
      <div class="blogm-icon">
        <van-icon name="comment-o" /><span>{{ article.comments.length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MArticleItem",
  props: {
    article: {
      type: Object,
    },
  },
  computed: {
    content() {
      return this.article.content.slice(0, 10) + "...";
    },
    id() {
      return this.article._id;
    },
  },
};
</script>

<style lang="stylus">
.blogm-article--aitem :nth-child(n):not(.blog-article--header) {
  margin-top: 6px;
}

.blogm-article--aitem {
  box-shadow: 0 0 2px 2px inset #666;
  border-radius 4px
}

.blogm-article--header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
}

.blogm-article--footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.blogm-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
}
</style>