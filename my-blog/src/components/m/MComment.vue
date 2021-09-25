<template>
  <van-cell>
    <van-row>
      <van-col class="blog-comment--left" :span="4" >
        <van-image
          :src="comment.uid.avatar"
          round
          fit="cover"
          width="60"
          height="60"
        >
        </van-image>
      </van-col>
      <van-col class="blog-comment--right" :span="16" :offset="4">
        <div class="nickname color-sky">{{ comment.uid.nickname }}</div>
        <div class="content fz14">{{ comment.content }}</div>
        <div class="date fz12">{{ comment.date }}</div>
      </van-col>
    </van-row>
  </van-cell>
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