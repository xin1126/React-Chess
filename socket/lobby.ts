const lobby = (io: any) => {
  io.on(
    'connection',
    (socket: any) => {
      socket.on('playerList', (list: Array<String>) => {
        io.emit('playerList', list)
      })
    }
  )
}

export default lobby
