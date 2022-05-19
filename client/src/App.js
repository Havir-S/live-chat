
import './App.css';
import io from 'socket.io-client'
import {useState} from 'react'
import Chat from './Chat'

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setshowChat] = useState(false)


  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setshowChat(true);
    }
  }

  return (
    <div className="App">
    {!showChat ? (
      <div className='joinChatContainer'>

        <h3>Join Chat</h3>
        <input type='text' placeholder='John...' onChange={(ev) => setUsername(ev.target.value)} />
        <input type='text' placeholder='Room ID...' onChange={(ev) => setRoom(ev.target.value)} />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
    ) : (
      <Chat socket={socket} username={username} room={room}/>
    
    )}
    </div>
  );
}

export default App;
