import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client'
const socket = io()

function App() {
  useEffect(() => {
    socket.emit('chat', 55555);
    socket.on('chat', (msg) => {
      console.log(msg);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
