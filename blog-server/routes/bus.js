const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const assert = require('http-assert')
const RESOURCE_POST_MAP = require('../plugins/RESORCE_POST_MAP')
const POP_POST_MAP = require('../plugins/POP_POST_MAP')
const { pagination } = require('../core/util')
const POPULATE_MAP = require('../plugins/POPULATE_MAP')
const POP_PUT_MAP = require('../plugins/POP_PUT_MAP')
const POP_GET_MAP = require('../plugins/POP_GET_MAP')
const qs = require('qs')
//创建资源 文章  评论  (分类我们自己创建,然后返回给前端,让前端选择分类)
router.post('/', async (req, res, next) => {

  try {
    assert(req.isPass, 401, '请先登录')
    let modelName = req.Model.modelName
    let body = req.body
    if (modelName in RESOURCE_POST_MAP) {
      // console.log(req._id)
      body = RESOURCE_POST_MAP[modelName]['body'](body, req._id)

    }
    let result = await req.Model.create(body.data)
    // console.log(result)
    if (modelName in POP_POST_MAP) {
      let { ref_id, ref_model, query_action, options } = POP_POST_MAP[modelName]
      let id = result._id
      let refId = result?.[ref_id]
      await ref_model[query_action](refId, options(id))
      assert(refId, 422, `${ref_id} 必填`)
      res.send(200, {
        message: '添加成功',
        data: {
          id: result._id //返回的是文章id 
        }
      })
    }


  } catch (err) {
    next(createError(400, '添加失败'))
  }
})

//修改资源
router.put('/:id', async (req, res, next) => {
  let putData = req.body
  console.log(putData)
  let _id = req.params.id //资源id
  let userId = req._id //用户id
  let isPass = req.isPass //是否通过鉴权
  let modelName = req.Model.modelName
  try {
    let { revisable, authField } = POP_PUT_MAP[modelName]
    let isValidate = (modelName in POP_PUT_MAP) && isPass
    assert(isValidate, 400, '无权修改')
    let data = await req.Model.findById(_id)
    assert(data, 404, '资源不存在')
    assert.equal(data?.[authField], userId, 400, '无权修改')
    let updateDate = Object.fromEntries(Object.entries(putData).filter(([key, value]) => {
      return (key in revisable)
    }))

    updateDate.date = new Date().toISOString()
    await req.Model.findByIdAndUpdate(_id, updateDate)
    res.send(200, {
      message: '修改成功',
    })
  } catch (err) {
    console.log(err.message)
    next(err)
  }
})


//删除资源
router.delete('/:id', async (req, res, next) => {
  await req.Model.findByIdAndDelete(req.params.id)
  res.send({
    errMsg: 'ok'
  })
})

//查询特定资源
/*
  文章
*/
router.get('/:id', async (req, res, next) => {
  let _id = req.params.id
  let modelName = req.Model.modelName
  let result
  try {
    if (modelName in POP_GET_MAP) {
      let { queryAction, options } = POP_GET_MAP[modelName]
      await req.Model[queryAction](_id, options())
    }
    if (modelName in POPULATE_MAP) {

      let populate = POPULATE_MAP[modelName]
      // console.log(populate)
      result = await req.Model.findById(_id).populate(populate)

      // console.log(result)
    }

    res.send(200, {
      message: '查询成功',
      data: result
    })
  } catch (err) {
    console.log(err)
  }
})

//查询资源列表(使用分页,懒加载)
router.get('/', async (req, res, next) => {
  let modelName = req.Model.modelName


  //req.query 已经是一个对象了,经过express 的包装
  // 如果article 是 某个columns 中的 那么 query ={column:传进来的column的_id} 
  let { size = 30, populate = {}, page = 1, dis = 8, query = {}, options } = req.query
  //返回分类标签, 在前端显示,然后通过前端显示的分类标签进行 详细的分类资源请求
  // console.log(query)
  
  if (query.length) {
    query = qs.parse(query)
  }


  // console.log(query)
  if (!query.q && modelName === "Column") {
    let list = await req.Model.find()
    // console.log(result)
    // let [...list] = result.map(item => item.name)
    res.send(200, {
      message: '分类已返回',
      data: {
        list
      }
    })
  }



  if (query.q) {
    //接口: article?query[q]=xxxx
    // console.log(query.q)
    let reg = new RegExp(query.q, 'i')
    // console.log(reg)
    query = {
      $or: [
        { title: { $regex: reg } },
        { content: { $regex: reg } }
      ]
    }
  }

  try {
    if (modelName in POPULATE_MAP) {
      populate = POPULATE_MAP[modelName]
    }

    let result = await pagination({ model: req.Model, query, options, populate, size, page, dis })
    // console.log(result)
    res.send(200, {
      message: '查询成功',
      data: result
    })

  } catch (err) {
    console.log(err)
    createError(404)
  }
})
module.exports = router