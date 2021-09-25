export default {
  "login": [
    {
      "label": "用户名",
      "query": "username",
      "placeholder": "用户名 必须为 数字 + 字母 6-10 位",
      "type": "text"
    },
    {
      "label": "密码",
      "query": "password",
      "placeholder": "密码  至少有一个大写字母  8-15 位",
      "type": "password"
    }
  ],
  "register": [
    {
      "label": "用户名",
      "query": "username",
      "placeholder": "用户名 必须为 数字 + 字母 6-10 位",
      "type": "text"
    },
    {
      "label": "密码",
      "query": "password",
      "placeholder": "密码  至少有一个大写字母  8-15 位",
      "type": "password"
    },
    {
      "label": "邮箱",
      "query": "email",
      "placeholder": "请输入邮箱地址",
      "type": "text"
    },
  ],
  "userInfo": [
    {
      label: "头像",
      query: "avatar",
      type: 'avatar',
    },
    {
      label: "用户名",
      query: "username",
      type: "text",
      readonly: true,
      placeholder: "用户名: 6-8位 字母数字"
    },

    {
      label: "昵称",
      query: "nickname",
      type: "text",
      placeholder: "请输入昵称"
    },
    {
      label: "邮箱",
      query: "email",
      type: "text",
      placeholder: "请输入邮箱地址"
    },
    {
      label: "签名",
      query: "signature",
      type: "text",
      placeholder: "请输入你的个性签名"
    }
  ]
}