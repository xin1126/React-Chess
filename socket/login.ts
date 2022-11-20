const login = (io: any) => {
  io.on('connection', (socket: any) => {
    let playerName: string
    socket.on('playerName', (name: string) => {
      io.emit('playerName', name)
      playerName = name
    })

    socket.on('disconnect', () => {
      console.log('有人斷線')
      io.emit('leave', playerName)
    })
  })
}

export default login
