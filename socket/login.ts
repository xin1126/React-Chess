const login = (io: any) => {
  io.on('connection', (socket: any) => {
    let playerName: string
    socket.on('playerName', (name: string) => {
      io.emit('playerName', name)
      playerName = name
    })

    socket.on('disconnect', () => {
      io.emit('leave', playerName)
    })
  })
}

export default login
