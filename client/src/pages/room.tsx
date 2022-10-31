import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io();

const Room: React.FC = () => {
  const [list, setList] = useState<string[]>([]);
  const [playerMsg, setPlayerMsg] = useState('');
  const renderRef = useRef(true);

  const handelMsg = (e: React.ChangeEvent<HTMLInputElement>) => setPlayerMsg(e.target.value);

  const submit = () => {
    if (!playerMsg) return;
    socket.emit('playerMsg', playerMsg);
    setPlayerMsg('');
  };

  useEffect(() => {
    if (renderRef.current && process.env.NODE_ENV === 'development') {
      renderRef.current = false;
      return;
    }
    socket.on('playerMsg', (text) => {
      setList((data) => [...data, text]);
    });
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <ul>
          {list.map((item) => (
            <li key={item}>
              {item}
            </li>
          ))}
        </ul>
        <input className="border border-black" value={playerMsg} type="text" onChange={handelMsg} />
        <button type="button" onClick={submit}>送出</button>
      </div>
    </div>
  );
};

export default Room;
