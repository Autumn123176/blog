<template>
  <div class="blog-chat">
    <div class="blog-chat--content">
      <div
        class="blog-chat--item"
        v-for="chat in chatList"
        :key="chat.time"
        :class="chat.dis"
      >
        <span v-if="chat.nickname" class="blog-chat--nickname">{{
          chat.nickname
        }}</span>
        <div :class="[chat.type === 'action'&&'notif','blog-chat--box']">
          <span class="blog-chat--time" v-if="chat.time">{{ chat.time }}</span>
          <p class="blog-chat--msg" v-if="chat.msg">{{ chat.msg }}</p>
        </div>
      </div>
      <div class="blog-chat--bottom">
        <el-input v-model="msg" placeholder="请输入内容"> </el-input>
        <el-button type="primary" @click="sendMsg" @keydown.enter="sendMsg">发送</el-button>
      </div>
    </div>
    <el-dialog title="欢迎进入聊天室" :visible.sync="dialogVisible" width="30%">
      输入昵称:
      <el-input v-model="nickname"> </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="enterChat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formatDate from "@/core/formdate";
import { io } from "socket.io-client";
let idx = 0
export default {
  name: "Socket",
  data() {
    return {
      chatList: [],
      msg: "",
      ws: null,
      nickname: "",
      dialogVisible: true,
    };
  },
  created() {
    if (this.$ws) {
      this.ws = this.$ws;
      this.getUserInfo();
      this.ws.emit("enterChat", { uid: this.uid, nickname: this.nickname });
      this.dialogVisible = false;
    } else {
      this.ws = io("ws://127.0.0.1:8888", { transports: ["websocket"] });
      // this.dialogVisible = true
    }

    // this.ws.on("connect", () => {
    //   console.log("建立连接");
    // });
    this.ws.on("chat", (data) => {
      this.serverChat(data);
    });
    this.ws.on("logout", (nickname) => {
      this.serverLog({ nickname, isLogin: false });
    });
    this.ws.on("logged", (nickname) => {
      this.serverLog({ nickname, isLogin: true });
    });
  },
  beforeDestroy() {
    this.ws.emit("leaveChat");
  },
  methods: {
    sendMsg() {
      let msg = this.msg;
      this.addChat({ isMe: true, msg, nickname: this.nickname });
      this.ws.emit("send", msg);
      this.msg = "";
    },
    getUserInfo() {
      let { nickname, _id } = this.$store.getters.UserInfo;
      this.nickname = nickname;
      this.uid = _id;
    },
    enterChat() {
      this.ws.emit("enterChat", { nikname: this.nikname });
      this.dialogVisible = false;
    },
    addChat({
      type = "msg",
      msg = "",
      nickname = "",
      time = formatDate(),
      isMe = false,
    }) {
      let dis = "left";
      if (type === "action") {
        dis = "center";
      }
      if (isMe) {
        dis = "right";
      }
      this.chatList.push({ type, msg, nickname, time, isMe, dis ,id: ++idx});
    },
    serverChat({ msg = "", nickname = "陌生人", time = "" }) {
      this.addChat({
        nickname,
        msg,
        time,
      });
    },
    serverLog({ nickname, isLogin }) {
      let state = isLogin ? "进入" : "离开";
      let msg = `${nickname} ${state}了聊天室`;
      this.addChat({
        type: "action",
        msg,
      });
    },
    submitEditor() {
      this.ws.emit("send", this.msg);
    },
  },
};
</script>

<style lang="stylus">
.blog-chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8) inset;
  min-height: 80vh;
}

.blog-chat--item {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.blog-chat--item.left {
  justify-content: flex-start;
}

.blog-chat--item.right {
  justify-content: flex-start;
  flex-direction: row-reverse;
}
.blog-chat--box
  display flex
  flex-direction column
  margin 25px
  padding 12px
  background-color #fff
  border-radius 8px

.blog-chat--nickname
  flex 0 0 auto
.blog-chat--time
  font-size 12px
.blog-chat--msg
  padding 6px 0 0
  line-height 1.5
  font-size 14px
.blog-chat--notif
  width 50%
  display flex
  align-items center
  justify-content space-around
  line-height 20px
.blog-chat--bottom
  position absolute
  bottom  -32px
  width 90%
  display flex
  background-color #888
  padding 20px 10px
</style>