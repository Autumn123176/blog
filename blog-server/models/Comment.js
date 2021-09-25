const mongoose = require('mongoose')
const { formatDate } = require('../core/util')

//谁的评论, 评论的哪篇文章, 评论的谁的评论
const schema = new mongoose.Schema({
  content:{
    type:String,
    required:true
  },
  date:{
    type:mongoose.SchemaTypes.Date,
    default: Date.now,
    get(val){
      return formatDate(new Date(val),'yyyy年MM月dd日hh:mm:ss')
    }
  },
  uid:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  aid:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Article',
  },

})
schema.set('toJSON', { getters: true })
module.exports = mongoose.model('Comment',schema)