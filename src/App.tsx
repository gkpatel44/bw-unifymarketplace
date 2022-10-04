import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import EditorWraped from './pages/EditorWraped';

function App() {

  const [roomName, setRoomName] = useState('')

  useEffect(() => {
    let currentUrl = (window.location.href).split('/')
    if (currentUrl[3] === '') {
      let newRoomName = `unify-marketplace-${new Date().getTime()}`
      setRoomName(newRoomName)
    } else {
      setRoomName(currentUrl[4]);
    }
  }, [])

  return (
    <div className="App h-screen">
      <Routes>
        <Route path="/" element={<EditorWraped roomName={roomName} />} />
        <Route path="/:id/:roomName" element={<EditorWraped roomName={roomName} />} />
        {/* <Route path="*" element={<Navigate to="/" />}/> */}
      </Routes>
    </div>
  );
}

export default App;
