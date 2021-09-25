<template>
  <el-card>
    <el-row>
      <el-col class="blog-comment--left" :span="4">
        <el-avatar :size="50" :src="comment.uid.avatar"> </el-avatar>
      </el-col>
      <el-col class="blog-comment--right" :span="18">
        <div class="nickname color-sky">{{ comment.uid.nickname }}</div>
        <div class="content fz14">{{ comment.content }}</div>
        <div class="date fz12">{{ comment.date }}</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
    },
  },
};
</script>

<style lang="stylus"></style>