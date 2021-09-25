const Article =require('../models/Article')
const Column = require('../models/Column')

module.exports = {
  "Article":{
    "ref_id":'column',
    "ref_model":Column,
    "query_action":'findByIdAndUpdate',
    "options":(_id)=>{
      return {
        "$push":{
          "aids" : _id
        }
      }
    }
  },
  "Comment":{
    "ref_id":'aid',
    "ref_model":Article,
    "query_action":'findByIdAndUpdate',
    "options":(_id)=>{
      return {
        "$push":{
          "comments":_id //
        },
        "$inc":{
          "comment" : 1
        }
      }
    }
  },
}