import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setName, setList, handleLeavePlayer } from '@/store/user'

const socket = io()

const Home: React.FC = () => {
  const [playerName, setPlayerName] = useState('')
  const user = useSelector((state: User) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handelMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value)
  }

  const submit = () => {
    if (!playerName) return

    if (user.playerList.includes(playerName)) return alert('名稱已使用')
    socket.emit('playerName', playerName)
    dispatch(setName(playerName))
    setPlayerName('')
    navigate('/lobby')
  }

  useEffect(() => {
    socket.emit('playerList')
    socket.on('playerList', (data) => {
      if (data?.length) dispatch(setList(data))
    })

    socket.on('leave', (name) => dispatch(handleLeavePlayer(name)))
    return () => {
      socket.removeAllListeners('playerList')
    }
  }, [])
  return (
    <div className="flex flex-col items-center text-5xl">
      <h1 className="mb-5">匿名暗棋對戰</h1>
      <div>
        <input
          className="border border-black"
          value={playerName}
          type="text"
          onChange={handelMsg}
          placeholder="請輸入名稱"
        />
        <button type="button" onClick={submit}>
          送出
        </button>
      </div>
    </div>
  )
}

export default Home
