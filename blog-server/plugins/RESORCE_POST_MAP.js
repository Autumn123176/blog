module.exports = {
  "Article":{
    body(body,_id){
      return {
        data:{
          ...body,
          uid:_id
        }
      }
    }
  },
  "Comment":{
    body(body,_id){
      return {
        data:{
          ...body,
          uid:_id
        }
      }
    }
  }
}