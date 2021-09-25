<template>
  <div class="blog-user--avatar">
    <el-avatar
      shape="circle"
      :size="50"
      :src="UserInfo.avatar"
      fit="cover"
    ></el-avatar>
    <svg
      t="1631156934814"
      class="icon logout"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2169"
      width="32"
      height="32"
      @click="logout"
    >
      <path
        d="M426.666667 192a21.333333 21.333333 0 0 1 3.140266 42.427733l-3.140266 0.238934H234.666667v597.333333H426.666667c10.717867 0 19.592533 7.8848 21.0944 18.193067l0.238933 3.140266a21.333333 21.333333 0 0 1-18.193067 21.0944l-3.140266 0.238934H213.333333a21.333333 21.333333 0 0 1-21.0944-18.193067L192 853.333333V213.333333c0-10.717867 7.8848-19.592533 18.193067-21.0944l3.140266-0.238933h213.333334z"
        p-id="2170"
        fill="#f4ea2a"
      ></path>
      <path
        d="M749.636267 512a21.333333 21.333333 0 0 1 3.1744 42.427733l-3.1744 0.238934H355.566933a21.333333 21.333333 0 0 1-3.1744-42.427734l3.1744-0.238933h394.069334z"
        p-id="2171"
        fill="#f4ea2a"
      ></path>
      <path
        d="M820.565333 560.64l-122.231466 101.888a35.566933 35.566933 0 0 1-58.333867-27.306667v-203.776a35.566933 35.566933 0 0 1 58.333867-27.306666l122.197333 101.888a35.566933 35.566933 0 0 1 0 54.613333z"
        p-id="2172"
        fill="#f4ea2a"
      ></path>
    </svg>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserLogin",
  computed: {
    ...mapGetters(["UserInfo"]),
  },
  created() {
    this.$store.dispatch("getUserInfo");
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      // this.$notify
    }
  }
};
</script>

<style lang="stylus">
.blog-user--avatar {
  display: flex;
  align-items: center;

  .icon.logout {
    width: 24px;
    height: 24px;
    padding-left: 20px;
    cursor: pointer;
    transition: 0.5s;
    transform: scale(1);

    &:hover {
      color: red;
      transform: scale(1.5);
    }
  }
}
</style>