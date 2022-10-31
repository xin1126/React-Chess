import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { setName } from '../store/user';

const socket = io();

const Home: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelMsg = (e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value);

  const submit = () => {
    if (!playerName) return;
    socket.emit('chat', playerName);
    dispatch(setName(playerName));
    setPlayerName('');
    navigate('/room');
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <input className="border border-black" value={playerName} type="text" onChange={handelMsg} />
        <button type="button" onClick={submit}>送出</button>
      </div>
    </div>
  );
};

export default Home;
