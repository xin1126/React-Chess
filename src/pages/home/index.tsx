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
    if (!user.playerName) {
      // 初次進入登入頁取得玩家列表
      socket.emit('playerList')
    } else {
      // 大廳玩家回登入頁，玩家列表刪除離開玩家
      dispatch(handleLeavePlayer(user.playerName))
    }

    socket.on('playerList', (data) => {
      // 玩家在登入頁時，當有其他玩家進入大廳，登入頁重新取得玩家列表
      if (data !== null) {
        data.push('init')
        dispatch(setList(data))
      }
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
