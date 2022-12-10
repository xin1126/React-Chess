import { io } from 'socket.io-client'
import piece from '@/lib/piece'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const socket = io()

interface CheckerboardList {
  lattice: Piece
  target: boolean
  open: boolean
}
interface Checkerboard {
  col: number
  list: Array<CheckerboardList>
}

const Room: React.FC = () => {
  const [msg, setMsg] = useState('')
  const [checkerboard, setCheckerboard] = useState<Checkerboard[]>([])
  const [msgList, setMsgList] = useState<string[]>([])
  const [roomPlayer, setRoomPlayer] = useState<string[]>([])
  const user = useSelector((state: User) => state)

  const { name } = useParams()

  const handleMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value)
  }

  const submit = () => {
    if (!msg) return alert('請輸入訊息')

    socket.emit('roomMsg', msg, name)
  }

  const handleLattice = (col: number, key: number) => {
    const tempCheckerboard = [...checkerboard]
    tempCheckerboard.forEach((checkerboardItem, checkerboardIndex) => {
      checkerboardItem.list.forEach((listItem, listIndex) => {
        tempCheckerboard[checkerboardIndex].list[listIndex].target = checkerboardIndex === col && listIndex === key
      })
    })
    tempCheckerboard[col].list[key].open = true
    setCheckerboard(tempCheckerboard)
  }

  const pieceStyle = (color: string) => (color === 'red' ? 'border-[red] text-[red]' : 'border-black text-black')

  const playerStatus = (name: string) => (name === user.playerName ? '玩家' : '對手')

  useEffect(() => {
    if (roomPlayer.length && roomPlayer[0] === name) socket.emit('roomPlayer', name, roomPlayer)
  }, [roomPlayer])

  useEffect(() => {
    socket.emit('join', name)
    socket.emit('roomPlayer', name, user.playerName)

    if (user.playerName === name) {
      socket.emit('roomName', user.playerName)
    }

    socket.on('roomMsg', (msg) => {
      setMsgList((data) => [...data, msg])
    })

    socket.on('roomPlayer', (name) => {
      if (!name) return

      if (typeof name !== 'string') {
        setRoomPlayer((data) => {
          if (data.length === name.length) return data
          return [...name]
        })
        return
      }
      if (typeof name === 'object') return
      setRoomPlayer((data) => [...data, name])
    })

    const initCheckerboard: Checkerboard[] = []
    for (let i = 0; i < 4; i += 1) {
      initCheckerboard.push({
        col: i,
        list: [],
      })
      for (let k = 0; k < 8; k += 1) {
        initCheckerboard[i].list.push({
          lattice: piece[0],
          target: false,
          open: false,
        })
        piece.splice(0, 1)
      }
    }
    setCheckerboard(initCheckerboard)
  }, [])
  return (
    <>
      <div className="flex">
        <ul className="mr-6 flex w-max border border-black">
          {checkerboard.map((item, itemIndex) => (
            <li key={item.col}>
              {checkerboard[itemIndex].list.map((list, listIndex) => (
                <div
                  onClick={() => handleLattice(item.col, listIndex)}
                  className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center border border-black"
                  key={listIndex}
                >
                  <span
                    className={`flex h-[60px] w-[60px]
                  items-center justify-center 
                  rounded-full border bg-[#ffdeac]
                  text-3xl font-bold
                  outline outline-2 outline-offset-4 outline-[#292929]
                  ${list.open && pieceStyle(list.lattice.color)}
                  ${list.target && 'opacity-50'}
                `}
                  >
                    {list.open && list.lattice.name}
                  </span>
                </div>
              ))}
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-center">
          <div>
            <span>{playerStatus(roomPlayer[0])}</span>
            {roomPlayer[0]}
          </div>
          <div className="py-[200px]">計時器10</div>
          <div>
            <span>{playerStatus(roomPlayer[1])}</span>
            {roomPlayer[1]}
          </div>
        </div>
      </div>
      {/* <div>

      </div> */}
      {/* <ul>
        {msgList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <input className="border border-black" value={msg} type="text" onChange={handleMsg} />
        <button type="button" onClick={submit}>
          送出
        </button>
      </div> */}
      {/* <p className="relative -top-32 text-center text-3xl">{count}</p> */}
    </>
  )
}

export default Room
