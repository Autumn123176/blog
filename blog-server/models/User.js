const mongoose = require('mongoose')
const {encrypt,decrypt} = require('../core/util')
const {host,port} = require('../config')
const schema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,'用户名必填'],
    unique:true,
    validate:{
      validator(val){
        return /^(?=[0-9a-zA-Z]*[0-9])(?=[0-9a-zA-Z]*[a-zA-Z])[0-9a-zA-Z]{6,10}$/.test(val)
      },
      message:"用户名 必须为 数字 + 字母 6-10 位"
    }
  },
  password:{
    type:String,
    required:[true,'密码必填'],
    select:false,
    validate:{
      //todo  
      validator(val){
        return val !== '密码格式不正确'
      },
      message:"密码  至少有一个大写字母  8-15 位"
    },
    set(val){
      //先进行set 再进行validate
      let isValidate =  /^(?=.*[A-Z])[^]{8,15}$/.test(decrypt(val))
      if(isValidate){
        return encrypt(val) 
      }
      return '密码格式不正确'
    }
  },
  email:{
    type: String,
    required: [true, '邮箱必填'],
    validate: {
      validator: function (val) {
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val)
      },
      message: "请输入合法邮箱地址"
    },
    unique: true
  },
  //TODO
  avatar:{
    type:String,
    //
    default:`${host}:${port}/images/jide.png`
  },  
  nickname:{
    type:String,
    validate:{
      validator(val){
        return /^.{1,12}$/.test(val)
      },
      message:'最大长度为12'
    },
    default:`用户${~~(Math.random() * 99999999)}`
  },
  signature:{
    type:String,
    default:'懒癌重症患者 ^_^'
  },
})


module.exports = mongoose.model('User',schema)