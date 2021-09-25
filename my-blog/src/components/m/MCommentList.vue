<template>
  <div>
    <MComment
      v-for="comment in comments"
      :key="comment._id"
      :comment="comment"
      class="blog-comment--item"
    />
  </div>
</template>

<script>
import MComment from "@/components/m/MComment";
export default {
  name: "CommentList",
  components: { MComment },
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