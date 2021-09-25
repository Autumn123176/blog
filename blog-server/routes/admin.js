const express = require('express')
const assert = require('http-assert')
const router = express.Router()
const ADMIN_MAP = require('../plugins/ADMIN_MAP')
const User = require('../models/User')
const setToken = require('../core/setToken')
const {decrypt} = require('../core/util')
//该接口放在 /admin 后面
router.post('/:admin',async(req,res,next)=>{
  let {admin} = req.params
  console.log(admin)
  let {username,password} = req.body
  let isAdmin = admin in ADMIN_MAP
  if(!isAdmin){
    assert(false,400,'请求出错')
  }
  console.log(admin)
  try {
    let user
    if(admin === 'login') {
      user = await User.findOne({username}).select('+password')
      assert(user,422,'用户不存在')
      //todo ,写了前端之后 再解开注释
      // assert(decrypt(password),decrypt(decrypt(user.password)),422,'账号密码不正确')
      assert(password,decrypt(user.password),422,'账号密码不正确')
    }
    if(admin === 'register') {
      user = await User.findOne({username})
      assert(!user,422,'用户名已存在')
      user = await User.create(req.body)
    }
    let token = await setToken(user)
    res.send(200,{
      message:'登录成功',
      data:{
        userId : user._id ,
        token
      }
    })
  } catch(err){
    console.log(err)
    next(err)
  }
})


module.exports = router