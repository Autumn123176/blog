module.exports = {
  'Article':{
    "queryAction":"findByIdAndUpdate",
    "options":()=>{
      return {
        "$inc":{
          "hit_num":1
        }
      }
    }
  }
}