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

  const tempRoomList = useRef<string[]>([])
  useEffect(() => {
    tempRoomList.current = roomList
  }, [roomList])

  const sendTarget = () => tempPlayerList.current.at(-1) === user.playerName

  useEffect(() => {
    if (!user.playerName) {
      // 初次進入登入頁取得玩家列表
      socket.emit('playerList')
    }

    socket.on('playerList', (data, status) => {
      // 登入玩家取得玩家列表
      if (data === null && sendTarget()) {
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

    // 初次進入大廳更新大廳玩家列表
    socket.on('playerName', (name) => {
      if (sendTarget()) {
        socket.emit('getRoomList', tempRoomList.current)
      }
      dispatch(setList(name))
    })

    // 建立房間更新房間列表
    socket.on('roomList', (name) => {
      if (tempRoomList.current.includes(name)) return
      setRoomList((data) => [...data, name])
    })

    // 初次進入大廳取得房間列表
    socket.on('getRoomList', (list) => {
      console.log(list)
      if (list !== null) setRoomList(list)
    })

    return () => {
      socket.removeAllListeners('playerList')
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
