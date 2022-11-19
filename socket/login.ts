const login = (io: any) => {
  io.on(
    'connection',
    (socket: any) => {
      socket.on('playerName', (name: string) => {
        io.emit('playerName', name)
      })
    }
  )
}

export default login
