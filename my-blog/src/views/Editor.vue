<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    appear
    mode="out-in"
  >
    <el-card class="blog-editor">
      <h3 class="blog-editor-title">标题</h3>
      <el-input
        ref="title"
        v-model="title"
        class="blog-editor-input"
        size="medium"
        placeholder="文章标题"
      ></el-input>

      <h3 class="blog-editor-title">内容</h3>
      <div id="blog-editor-textarea"></div>
      <div class="blog-editor-tags">
        <h3 class="blog-editor-title">分类选择</h3>
        <el-radio-group v-model="column">
          <el-radio-button
            v-for="item in columns"
            :key="item.id"
            :label="item.id"
            >{{ item.name }}</el-radio-button
          >
        </el-radio-group>
      </div>

      <div class="blog-editor-button">
        <el-button type="primary" @click="submitEditor">提交</el-button>
        <el-button type="primary" @click="cancelEditor">重置</el-button>
      </div>
    </el-card>
  </transition>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      content: "",
      title: "",
      columns: [],
      column: "",
    };
  },
  created() {
    this.getColumns();
  },
  mounted() {
    const editor = new wangEditor(`#blog-editor-textarea`);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.content = newHtml;
    };
    editor.config.uploadImgServer = process.env.VUE_APP_FILE_UPLOAD_PATH;
    editor.config.uploadImgMaxSize = 5 * 1024 * 1024; // 5M
    editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
    editor.config.uploadImgMaxLength = 5;
    editor.config.uploadFileName = "file";
    editor.config.uploadImgHeaders = {
      Authorization: `Bearer ${this.$store.state.token}`,
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  computed: {},
  methods: {
    async getColumns() {
      try {
        let result = await this.$api({ type: "columns" });
        let list = result.list.map((item) => {
          return {
            id: item._id,
            name: item.name,
          };
        });
        this.column = list[0].id;
        this.columns = list;
      } catch (err) {
        this.$notify.error({
          title: "错误",
          message: "获取分类错误",
        });
      }
    },
    submitEditor() {
      // 通过代码获取编辑器内容
      // let content = this.editor.txt.html()
      if (!this.validateEditor()) {
        return;
      }
      this.postEditorData();
    },
    cancelEditor() {
      this.editor.txt.clear();
    },
    validateEditor() {
      if (this.title.trim().length === 0) {
        this.$notify.error({
          title: "错误",
          message: "请填写标题",
        });
        this.$refs.title.focus();
        return false;
      }
      if (this.content.trim().length === 0) {
        this.$notify.error({
          title: "错误",
          message: "内容不能为空",
        });
        return false;
      }
      return true;
    },
    async postEditorData() {
      let postData = {
        column: this.column,
        title: this.title,
        content: this.content,
        cover: this.content.match(/<img src="([^"']*)"/)?.[1] || undefined,
      };
      try {
        this.$api({
          type: "postArticle",
          data: JSON.parse(JSON.stringify(postData)),
        });
        this.$notify.success({
          title: "成功",
          message: "文章上传成功",
        });
      } catch (err) {
        this.$notify.error({
          title: "错误",
          message: "提交失败",
        });
      }
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>

<style lang="stylus">
.blog-editor-button
  display flex
  justify-content center
</style>