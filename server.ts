const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, 'client/build')))

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

app.get('*', (req: unknown, res: { sendFile: (arg0: unknown) => void }) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000
server.listen(port)
