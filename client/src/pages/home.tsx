import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io();

const Home: React.FC = () => {
  const [list, setList] = useState<string[]>([]);
  const [msg, setMsg] = useState('');
  const renderRef = useRef(true);
  const navigate = useNavigate();

  const handelMsg = (e: React.ChangeEvent<HTMLInputElement>) => setMsg(e.target.value);

  const submit = () => {
    if (!msg) return;
    socket.emit('chat', msg);
    setMsg('');
    navigate('/room');
    console.log(list);
  };

  useEffect(() => {
    if (renderRef.current && process.env.NODE_ENV === 'development') {
      renderRef.current = false;
      return;
    }
    socket.on('chat', (text) => {
      console.log(text);

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
        <input className="border border-black" value={msg} type="text" onChange={handelMsg} />
        <button type="button" onClick={submit}>送出</button>
      </div>
    </div>
  );
};

export default Home;