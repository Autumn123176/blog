## 思路
  全局鉴权: (状态管理)
    查看 是否携带 token , 有 就解析出来 (_id,usename)
    并 给 req 挂载属性 isPass , 针对需要鉴权的路由进行第一层过滤 如果 鉴权不成功 ,直接 req.isPass = false

  登录注册接口: /admin/:admin
    1. 登录注册 成功 均返回 token 和 用户 _id,由前端 本地存储 token 

  restFul 接口 (用于资源的增删改查 )
    1. 中间件 : inflection 
    2. 鉴权: put(需要与req._id进行比较,也就是只能修改删除自身的信息) ; delete ; post(通过全局鉴权的就行)

  user 接口 (用户针对自身信息的增删改查)

  keys 接口  (获取公钥接口,当前端注册时,对密码进行加密时调用)

  index 接口 (主页接口, 在主页的时候 点击分类等,只改变hash值(不会重新发起请求) )
  
  upload 接口 (文件上传) 文章 , 头像 , 封面图
## 接口

### 登录注册接口
 /admin/:admin  
  返回信息: token , userId


### restful api
  /api/rest/:resource
  分类只能有后台来设置 有哪些分类, 前台根据文章类别,自行 选择分类并添加给文章

#### article


### 


## 测试
 用户 
  _id:6130871ecbca84470846e07a
  token  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkcxMjM0NTYiLCJfaWQiOiI2MTMwODcxZWNiY2E4NDQ3MDg0NmUwN2EiLCJleHAiOjE2MzA4Mjk0NzAsImlhdCI6MTYzMDU3MDI3MH0.R7VBuN-F4DZjcWXrA0kThFYpseoC32ITmF3Cfm8ksaVK1OSkfaquU64Ho5ktJfRhe6WAIVF08DGXdDPmbVrTvw

 栏目: 
  _id 61308f57a4687ca940c124df