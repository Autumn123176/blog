const mongoPage = require('mongoose-sex-page')
const { mongoose } = require('./connect')
const schema = new mongoose.Schema({
  num: {
    type: Number
  }
})

//有了分页插件我们可以很方便的利用前台传过来的信息,然后返回所需要的数据



const Num = mongoose.model('Num', schema)

// console.log(Num)
//还可以进行一些配置 
mongoPage(Num)
  .find({num:{$lt: 40}})
  .sort({num:1})
  .page(1) //展示第几页
  .size(30) //一页最大拥有的数据量
  .display(2) //[1,2]    总共拥有的页数的数组形式
  .simple(true) // 开启这个之后返回的数据只有我们查找到的数据 (数组包对象)
  .exec()
  .then((result) => {
    console.log(result)
  })
/*
  {
  page: 1, //展示第几页
  size: 20,  //每页记录的数据量
  total: 30, //数据总量
  records: [ //记录的数据
    { _id: 612dfcf43738176fda81d351, num: 0, __v: 0 },
    { _id: 612dfcf43738176fda81d352, num: 1, __v: 0 },
    { _id: 612dfcf43738176fda81d353, num: 2, __v: 0 },
    { _id: 612dfcf43738176fda81d354, num: 3, __v: 0 },
    { _id: 612dfcf43738176fda81d355, num: 4, __v: 0 },
    { _id: 612dfcf43738176fda81d356, num: 5, __v: 0 },
    { _id: 612dfcf43738176fda81d357, num: 6, __v: 0 },
    { _id: 612dfcf43738176fda81d358, num: 7, __v: 0 },
    { _id: 612dfcf43738176fda81d359, num: 8, __v: 0 },
    { _id: 612dfcf43738176fda81d35a, num: 9, __v: 0 },
    { _id: 612dfcf43738176fda81d35b, num: 10, __v: 0 },
    { _id: 612dfcf43738176fda81d35c, num: 11, __v: 0 },
    { _id: 612dfcf43738176fda81d35d, num: 12, __v: 0 },
    { _id: 612dfcf43738176fda81d35e, num: 13, __v: 0 },
    { _id: 612dfcf43738176fda81d35f, num: 14, __v: 0 },
    { _id: 612dfcf43738176fda81d360, num: 15, __v: 0 },
    { _id: 612dfcf43738176fda81d361, num: 16, __v: 0 },
    { _id: 612dfcf43738176fda81d362, num: 17, __v: 0 },
    { _id: 612dfcf43738176fda81d363, num: 18, __v: 0 },
    { _id: 612dfcf43738176fda81d364, num: 19, __v: 0 }
  ],
  pages: 2, //总页数
  display: [ 1, 2 ]
}
*/ 


// mongoPage(Num).find().sort({ '_id': -1 }).select('num').size(20).page(1).display(8).exec().then(res => console.log(res))


