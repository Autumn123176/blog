<template>
  <div>
    <el-card
      shadow="hover"
      v-for="item in articles"
      :key="item._id"
      class="blog-articles--item"
    >
      <ArticleItem :listItem="item" v-if="articles.length !== 0" />
      <div v-else>没有更多文章了</div>
    </el-card>
  </div>
</template>

<script>
import ArticleItem from "../components/article/ArticleItem.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("likes");
// import { mapGetters } from "vuex";
import QS from "qs";
export default {
  name: "ArticleList",
  data() {
    return {
      articles: [],
      size: 4,
      page: 1,
    };
  },
  props: {
    loading: {
      type: Boolean,
    },
  },
  inject: ["closeLoadClock"],
  mounted() {
    this.$eventBus.$on("search", (q) => {
      this.q = q;
      this.cancelArticles();
      this.getArticles();
    });
  },
  created() {
    this.getArticles();
  },
  components: {
    ArticleItem,
  },
  computed: {
    ...mapState(["likes"]),
  },
  watch: {
    loading(val) {
      if (val) {
        this.getArticles();
      }
    },
    // $route(to) {
    //   if (to.name === "index") {
    //     this.cancelArticles();
    //     this.getArticles();
    //   }
    // },
  },

  methods: {
    cancelArticles() {
      this.page = 1;
      this.articles = [];
    },
    getQuery() {
      let column = this.$route.query?.columnId;
      let q = this.q || undefined;
      console.log(q);
      let query = JSON.parse(JSON.stringify({ column, q }));
      console.log(query);
      return query;
    },
    async getArticles() {
      let data = { size: this.size, page: this.page };
      let query = this.getQuery();
      if (Object.keys(query).length > 0) {
        data.query = QS.stringify(query);
      }
      // console.log(query);
      let result = await this.$api({ type: "articles", data });
      console.log(result);

      if (this.articles.length >= result.total) {
        //没有更多了
        // console.log("没有更多了");
        this.$notify.info({
          title: "通知",
          message: "没有更多文章咯",
        });
        return;
      }
      this.articles.push(...result.list);
      this.closeLoadClock();
      this.page++;
      if (Object.keys(this.$store.state.userInfo).length > 0) {
        let userInfo = await this.$api({ type: "getUserInfo" });
        let likeArr = this.articles.map((item) => {
          return {
            users: item.like_users,
            id: item._id,
          };
        });
        // console.log(likeArr);
        if (userInfo) {
          likeArr.forEach((item) => {
            let uid = userInfo._id;
            // console.log(userInfo._id);
            // console.log(item.users);
            if (item.users.includes(uid) && !this.likes.includes(uid)) {
              console.log(item.id);
              this.$store.dispatch("likes/pushLike", item.id);
            }
          });
        }
      }

      // console.log(this.articles);
    },
  },
};
</script>

<style lang="stylus">
.blog-articles--item + .blog-articles--item {
  margin-top: 12px;
}
</style>