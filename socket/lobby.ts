const lobby = (io: any) => {
  io.on('connection', (socket: any) => {
    socket.on('playerList', (list: Array<String>, status: boolean) => {
      io.emit('playerList', list, status)
    })

    socket.on('join', (name: string) => {
      socket.join(name)
      io.emit('roomList', name)
    })
  })
}

export default lobby
