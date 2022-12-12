import { io } from 'socket.io-client'
import { useEffect, useState, useRef } from 'react'
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

  const tempPlayerList = useRef<string[]>([])
  useEffect(() => {
    tempPlayerList.current = user.playerList
  }, [user.playerList])

  useEffect(() => {
    socket.on('playerList', (data, status) => {
      // 登入玩家取得玩家列表
      if (data === null && tempPlayerList.current.at(-1) === user.playerName) {
        socket.emit('playerList', tempPlayerList.current)
        return
      }

      // 是否為 store 更新，必免無限迴圈
      if (status) return

      // 玩家回登入頁，更新 store
      if (data?.length !== tempPlayerList.current?.length) {
        dispatch(setList(data))
      }
    })
    return () => {
      socket.removeAllListeners('playerList')
    }
  }, [])

  useEffect(() => {
    socket.on('playerName', (name) => dispatch(setList(name)))
    socket.on('roomList', (name) => setRoomList((data) => [...data, name]))
    return () => {
      socket.removeAllListeners('playerName')
    }
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
