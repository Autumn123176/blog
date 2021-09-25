const app = require('./app')
let webSocketServer = require('http').Server(app)
let socketIo = require('socket.io')
let io = socketIo(webSocketServer, { transports: ['websocket'] })

let { formatDate } = require('./core/util')
const users = {}

io.on('connection', (socket) => {
  //socket对象是 建立连接的会话对象

  socket.on('online', ({ uid, nickname }) => {
    console.log(users)
    if (users[uid]) {
      users[uid].socket.disconnect()
    }
    users[uid] = {
      uid,
      nickname,
      socket,
    }
    socket.uid = uid
    socket.ghost = false
  })

  socket.on('enterChat', ({ uid = createTempId(), nickname }) => {
    // console.log(users)
    io.sockets.emit('logged', nickname)
    if (users[uid]) {
      return
    }
    users[uid] = {
      uid,
      nickname,
      socket
    }
    socket.uid = uid
    socket.ghost = true
  })

  socket.on('leaveChat',()=>{
    let uid = socket.uid
    if(socket.ghost){
      socket.disconnect()
      delete users[uid]
    }
    io.sockets.emit('logout',users[uid]?.nickname)
  })

  socket.on('disconnect',()=>{
    let uid = socket.uid
    delete users[uid]
  })
  socket.on('send',(msg)=>{
    // console.log(users)
    let nickname = users[socket['uid']]?.['nickname']
    // console.log(nickname)
    socket.broadcast.emit('chat', {
      nickname,
      msg,
      time: formatDate()
    })
  })
})

webSocketServer.listen(8888,()=>{
  console.log('聊天室开启')
})

function createTempId() {
  return Date.now() + Math.random().toString(36).slice(-6)
}

module.exports = webSocketServer