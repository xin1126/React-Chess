import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io();

const App: React.FC = () => {
  const [list, setList] = useState<string[]>([]);
  const [msg, setMsg] = useState('');
  const renderRef = useRef(true);

  const handelMsg = (e: React.ChangeEvent<HTMLInputElement>) => setMsg(e.target.value);

  const submit = () => {
    socket.emit('chat', msg);
    setMsg('');
    console.log(list);
  };

  useEffect(() => {
    if (renderRef.current && process.env.NODE_ENV === 'development') {
      renderRef.current = false;
      return;
    }
    socket.on('chat', (text) => {
      setList((data) => [...data, text]);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {list.map((item) => (
            <li key={item}>
              {item}
            </li>
          ))}
        </ul>
        <input value={msg} type="text" onChange={handelMsg} />
        <button type="button" onClick={submit}>送出</button>
      </header>
    </div>
  );
};

export default App;
