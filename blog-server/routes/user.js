const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Article = require('../models/Article')
const Column = require('../models/Column')
const assert = require('http-assert')
const qs = require('qs')




router.put('/', async (req, res, next) => {
  let putData = req.body
  let isPass = req.isPass //鉴权结果
  let userId = req._id //userID
  console.log(putData,'123312312')
  
  try {
    assert(isPass, 400, "无权修改")
    let result = await User.findByIdAndUpdate(userId, putData, { runValidators: true, new: true })
    res.send(200, {
      message: '修改成功'
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//查询资源详情
router.get('/', async (req, res, next) => {
  let _id = req._id
  try {
    let userResult = await User.findById(_id)
    // console.log(userResult, 'jieguo')
    let articleCount = await Article.find({ uid: _id }).count()
    // console.log(articleCount, '数量 1')
    let columns = await Column.find().populate([{ path: 'aids', select: 'uid' }])
    console.log(columns)
    columns = columns.map((item) => {
      let result = item.aids.filter(item => {
        return String(item.uid) === String(_id)
      })
      return result.length === 0 ? null : result
    }).filter(item => item !== null)
    // console.log(columns.aids)
    console.log(columns)


    userResult = userResult.toJSON()
    // console.log( typeof userResult)
    userResult.articleCount = articleCount
    userResult.columnCount = columns.length || 0
    res.send(200, {
      message: '查询成功',
      data: userResult
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
})


module.exports = router

