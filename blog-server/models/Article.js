const mongoose = require('mongoose')
const { formatDate } = require('../core/util')
const { uploadURL } = require('../config')
const schema = new mongoose.Schema({
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    set (val) {
      try {
        val = decodeURIComponent(`${val}`).replace(/\"/g, "\'")
        return val
      } catch (err) {
        return val
      }
    },
    required: true
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
    get(val) {
      return formatDate(new Date(val), 'yyyy年MM月dd日hh:mm:ss')
    }
  },
  hit_num: {
    type: Number,
    default: 0
  },
  like_num: {
    type: Number,
    default: 0
  },
  comment_num: {
    type: Number,
    default: 0
  },
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment'
    }
  ],
  column: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Column',
    required: true
  },
  cover: {
    type: String,
    default: `${uploadURL}article/article-cover.jpg`
  },
  like_users: [{
    type: mongoose.SchemaTypes.ObjectId,
  }]
})
schema.set('toJSON', { getters: true })
module.exports = mongoose.model('Article', schema)