import logo from '@/assets/logo.svg'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { setName } from '@/store/user'

const socket = io()

const Home: React.FC = () => {
  const [playerName, setPlayerName] = useState('')
  const [playerList, setPlayerList] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handelMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value)
  }

  const submit = () => {
    if (!playerName) return
    if (playerList.includes(playerName)) return alert('名稱已使用')
    socket.emit('playerName', playerName)
    dispatch(setName(playerName))
    setPlayerName('')
    navigate('/lobby')
  }

  useEffect(() => {
    socket.emit('playerList')
    socket.on('playerList', (data) => {
      if (data?.length) setPlayerList(data)
    })
  }, [])
  return (
    <div className="flex flex-col items-center text-5xl">
      <p>首頁12111</p>
      <img className="w-2/4" src={logo} alt="logo" />
      <div>
        <input
          className="border border-black"
          value={playerName}
          type="text"
          onChange={handelMsg}
        />
        <button type="button" onClick={submit}>
          送出
        </button>
      </div>
    </div>
  )
}

export default Home
