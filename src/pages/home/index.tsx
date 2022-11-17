import logo from '@/assets/logo.svg'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io()

const Home: React.FC = () => {
  const [playerName, setPlayerName] = useState('')
  const [list, setList] = useState<string[]>([])
  const handelMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value)
  }

  const submit = () => {
    if (!playerName) return
    socket.emit('test', playerName)
    setPlayerName('')
  }

  useEffect(() => {
    console.log(7777)

    socket.on('test', (text) => {
      setList((data) => [...data, text])
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
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
