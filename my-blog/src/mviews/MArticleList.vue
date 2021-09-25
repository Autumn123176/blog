<template>
  <div class="blogm-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <router-link
          v-for="item in articles"
          :key="item._id"
          :to="{ name: 'mArticle', params: { id: item._id } }"
        >
          <MArticleItem :article="item"
        /></router-link>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import QS from "qs";
import MArticleItem from "@/components/m/MArticleItem";
export default {
  name: "MArticleList",
  components: {
    MArticleItem,
  },
  props:{
    columnId:{
      type:String
    }
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      refreshing: false,
      size: 4,
      page: 1,
      q:''
    };
  },
  mounted(){
    this.$eventBus.$on('search',(q)=>{
      this.q=q;
      this.onRefresh()
    })
  },
  methods: {
    resetParams() {
      this.page = 1;
      this.loading = true;
      this.finished = false;
      this.articles = []
    },
    onRefresh() {
      this.resetParams();
      this.onLoad();
    },
    onLoad() {
      this.getArticles();
    },
    getQuery() {
      let column = this.columnId || undefined;
      let q = this.q || undefined;
      // console.log(q);
      let query = JSON.parse(JSON.stringify({ column, q }));
      // console.log(query);
      return query;
    },
    async getArticles() {
      try {
        let data = { size: this.size, page: this.page };
        let query = this.getQuery();
        if (Object.keys(query).length > 0) {
          data.query = QS.stringify(query);
        }
        // console.log(query);
        let result = await this.$api({ type: "articles", data });
        console.log(result);
        if (this.refreshing) {
          this.articles = [];
          this.refreshing = false;
        }
        if (this.articles.length >= result.total) {
          this.finished = true;
          return;
        }
        this.articles.push(...result.list);
        this.loading = false;
        this.page++;
        // console.log(likeArr);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>