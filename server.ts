import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import socket from './socket/index'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
socket(io)

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
