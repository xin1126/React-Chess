import login from './login'
import lobby from './lobby'
import room from './room'

const initSocket = (io: any) => {
  login(io)
  lobby(io)
  room(io)
}

export default initSocket
