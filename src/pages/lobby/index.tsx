import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { setList } from '@/store/user'

const socket = io()

const Lobby: React.FC = () => {
  const user = useSelector((state: User) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    const sendTarget = user.playerList.at(-1) === user.playerName
    if (sendTarget) socket.emit('playerList', user.playerList)
    socket.on('playerList', (data) => {
      if (data === null) socket.emit('playerList', user.playerList)
    })
  }, [user.playerList])

  useEffect(() => {
    socket.on('playerName', (name) => {
      dispatch(setList(name))
    })
  }, [])

  return (
    <>
      <h2>大廳玩家列表</h2>
      <ul>
        {user.playerList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  )
}

export default Lobby
