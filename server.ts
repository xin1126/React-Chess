const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

io.on(
  'connection',
  (socket: { on: (arg0: string, arg1: (msg: string) => void) => void }) => {
    socket.on('playerName', (name) => {
      io.emit('roomPlayer', name)
    })

    socket.on('roomPlayer', (room) => {
      io.emit('playerName', room)
    })
    socket.on('test', (name) => {
      io.emit('test', name)
    })
  }
)

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
}
app.use(express.static('build', options))

const port = process.env.PORT || 5000
server.listen(port)
