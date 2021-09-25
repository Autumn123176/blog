const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/myblog',{
  useUnifiedTopology: true,
  useNewUrlParser: true
})
mongoose.set('useCreateIndex', true)
const db = mongoose.connection

db.on('error', function (err) {
  console.log(err)
})
db.on('open', function (err) {
  console.dir('mongodb://127.0.0.1:27017/myblog is open')
})

module.exports = {
  mongoose
}