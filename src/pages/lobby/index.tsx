import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { setList } from '@/store/user'
import { useNavigate } from 'react-router-dom'

const socket = io()

const Lobby: React.FC = () => {
  const [roomList, setRoomList] = useState<string[]>([])
  const user = useSelector((state: User) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toRoom = () => {
    navigate(`/room/${user.playerName}`)
  }

  const joinRoom = (name: string) => {
    navigate(`/room/${name}`)
  }

  useEffect(() => {
    const sendTarget = user.playerList.at(-1) === user.playerName
    if (sendTarget) socket.emit('playerList', user.playerList)
    socket.on('playerList', (data) => {
      if (data === null) socket.emit('playerList', user.playerList)
    })
  }, [user.playerList])

  useEffect(() => {
    socket.on('playerName', (name) => dispatch(setList(name)))
    socket.on('roomList', (name) => setRoomList((data) => [...data, name]))
  }, [])

  return (
    <>
      <div className="text-center">
        <button onClick={toRoom} className="rounded-xl border border-black px-4 py-2">
          建立房間
        </button>
      </div>
      <div className="flex">
        <div className="mr-5">
          <h2>大廳玩家列表</h2>
          <ul>
            {user.playerList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>房間列表</h2>
          <ul>
            {roomList.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => joinRoom(item)}>加入</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Lobby
