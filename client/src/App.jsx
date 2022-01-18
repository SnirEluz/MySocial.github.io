import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './comp/Header';
import Main from './comp/Main';

function App() {
  const [userSession, setUserSession] = useState([])
  const [updatePosts, setUpdatePosts] = useState(false)
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:1001/users/userSession', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      })
      const data = await res.json()
      setUserSession(data)
    })()
  }, [])
  return (
    <div className="App">
      <Header
        userSession={userSession}
        setUserSession={setUserSession}
        setUpdatePosts={setUpdatePosts} />
      <Main
        userSession={userSession}
        setUserSession={setUserSession}
        updatePosts={updatePosts}
        setUpdatePosts={setUpdatePosts} />
    </div>
  );
}

export default App;
