<template>
  <div>
    <Comment
      v-for="comment in comments"
      :key="comment._id"
      :comment="comment"
      class="blog-comment--item"
    />
  </div>
</template>

<script>
import Comment from "@/components/comment/Comment";
export default {
  name: "CommentList",
  components: { Comment },
  props: {
    comments: {
      type: Array,
    },
  },
};
</script>

<style lang="stylus">
.blog-comment--item
  margin-bottom 12px
</style>