import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const socket = io()

const Room: React.FC = () => {
  const [msg, setMsg] = useState('')
  const [msgList, setMsgList] = useState<string[]>([])
  const user = useSelector((state: User) => state)

  const { name } = useParams()

  const handleMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value)
  }
  const submit = () => {
    if (!msg) return alert('請輸入訊息')

    socket.emit('roomMsg', msg, name)
  }

  useEffect(() => {
    socket.emit('join', name)

    if (user.playerName === name) {
      socket.emit('roomName', user.playerName)
    }

    socket.on('roomMsg', (msg) => {
      setMsgList((data) => [...data, msg])
    })
  }, [])
  return (
    <>
      <h2>訊息</h2>
      <ul>
        {msgList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <input className="border border-black" value={msg} type="text" onChange={handleMsg} />
        <button type="button" onClick={submit}>
          送出
        </button>
      </div>
      {/* <p className="relative -top-32 text-center text-3xl">{count}</p> */}
    </>
  )
}

export default Room
