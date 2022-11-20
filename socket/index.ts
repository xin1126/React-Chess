import login from './login'
import lobby from './lobby'

const initSocket = (io: any) => {
  login(io)
  lobby(io)
}

export default initSocket
