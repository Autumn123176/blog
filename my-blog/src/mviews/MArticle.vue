<template>
  <div class="blog-article--aitem shadow">
    <div class="blog-article--header">
      <h3 class="blog-artilce--tit">{{ article.title }}</h3>
      <p class="blog-article--author">作者: {{ nickname }}</p>
      <p class="el-icon-timer">{{ article.date }}</p>
    </div>

    <p
      class="blog-article-con all"
      v-html="article.content"
      v-once
      v-if="article.content"
    ></p>
    <div class="blog-article--footer">
      <!-- <van-icon name="like-o" @click="like" :v-text="likeNum"/> -->
      <span
        class="el-icon-star-off like-btn"
        :class="{ active: isLike }"
        @click="like"
        >{{ likeNum }}
      </span>
      <span class="el-icon-view"> {{ article.hit_num }} </span>
      <span class="el-icon-edit"> {{ commentLen }} </span>
    </div>
    <div class="blog-comment">
      <van-field
        v-model="textarea"
        ref="textarea"
        type="textarea"
        placeholder="请输入评论内容"
      />
      <!-- <el-input
        class="blog-comment--area"
        ref="textarea"
        type="textarea"
        :rows="2"
        placeholder="请输入评论内容"
        v-model="textarea"
        resize="none"
      > -->
      <!-- </el-input> -->
      <div id="blog-comment--btn">
        <van-button @click="submit">提交</van-button>
        <van-button @click="clear">重置</van-button>
      </div>
    </div>
    <MCommentList :comments="comments" />
  </div>
</template>

<script>
import MCommentList from "@/components/m/MCommentList";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("likes");

// import base from "@/config/base.config";
// let { LIKES_NAME } = base;
export default {
  name: "ArticleContent",
  components: {
    MCommentList,
  },
  data() {
    return {
      article: {},
      comments: [],
      nickname: "默认名称",
      textarea: "",
      sepNum: 0,
    };
  },
  // watch:{
  //   isLike(){

  //   }
  // },
  computed: {
    likeNum() {
      return Math.max(0, this.article.like_num + this.sepNum);
    },
    ...mapGetters({ localLike: "isLike" }),
    isLike() {
      return this.localLike(this.id);
    },
    id() {
      return this.$route.params.id;
    },
    commentLen() {
      return this.comments.length;
    },
  },
  created() {
    this.getArticleById();
    this.$eventBus.$off("focus", this.focus);
    this.$eventBus.$on("focus", this.focus);
  },
  // mounted() {
  //   console.log(this.$store.state);
  // },
  watch: {
    isLike() {
      this.sepNum += this.isLike ? 1 : -1;
    },
  },
  methods: {
    like() {
      console.log(this.isLike);
      this[this.isLike ? "pullLike" : "pushLike"](this.id);
      this.sendLikes(this.id);
    },
    ...mapActions(["pullLike", "pushLike", "sendLikes"]),
    focus() {
      this.$refs.textarea?.focus();
    },
    async getArticleById() {
      let result = await this.$api({
        type: "getArticleById",
        data: { id: this.id },
      });
      this.article = result;
      this.comments = result.comments;
      this.nickname = result.uid.nickname;
      console.log(this.article.like_users);
      // this.article.like_users
      console.log(this.article._id);
      console.log(this.$store.state.userInfo._id);
      if (this.$store.state.userInfo._id in this.article.like_users) {
        this.pushLike(this.article._id);
      }
    },
    async postComments() {
      if (this.textarea.trim().length === 0) {
        this.$toast.fail("请填写内容");
        this.focus();
        return false;
      }
      try {
        await this.$api({
          type: "postComment",
          data: { aid: this.id, content: this.textarea },
        });
        this.clear();
        this.$toast.success("评论成功");
      } catch (err) {
        console.log(err);
      }
    },
    clear() {
      this.textarea = "";
    },
    async submit() {
      await this.postComments();
      await this.getArticleById();
    },
  },
  // beforeRouteEnter(to,from,next){

  // }
};
</script>

<style lang="stylus" scoped>
.blog-article--header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

// .blog-article--header + .el-icon-timer {
// width: 100%;
// text-align: center;
// }
.blog-article-con.all {
  text-indent: 2em;
}

.blog-comment--area>textarea {
  height: 120px;
}

.like-btn {
  cursor: pointer;

  &.active {
    color: orange;
  }
}

#blog-comment--btn .van-button__content {
  margin-top: 0;
}
</style>