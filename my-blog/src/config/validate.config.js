export default {
  username: [
    { required: true, message: '账号必填', trigger: 'blur' },
    { pattern: /^(?=[0-9a-zA-Z]*[0-9])(?=[0-9a-zA-Z]*[a-zA-Z])[0-9a-zA-Z]{6,10}$/, message: '用户名 必须为 数字 + 字母 6-10 位', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱必填', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }],
  password: [
    { required: true, message: '密码必填', trigger: 'blur' },
    { pattern: /^(?=.*[A-Z])[^]{8,15}$/, message: '密码  至少有一个大写字母  8-15 位', trigger: 'blur' }],
  name: [
    { required: true, message: '名称必填', trigger: 'blur' }],
  nickname: [
    { required: true, message: '昵称必填', trigger: 'blur' }
  ]
}