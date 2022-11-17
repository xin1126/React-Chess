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
  }
)

const port = process.env.PORT || 5000
server.listen(port)
