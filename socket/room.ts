const room = (io: any) => {
  io.on('connection', (socket: any) => {
    socket.on('roomName', (list: Array<String>) => {
      io.emit('roomName', list)
    })

    socket.on('roomMsg', (msg: string, roomName: string) => {
      io.to(roomName).emit('roomMsg', msg)
    })

    socket.on('roomPlayer', (roomName: string, name: string) => {
      io.to(roomName).emit('roomPlayer', name)
    })
  })
}

export default room
