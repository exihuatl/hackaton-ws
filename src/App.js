import React, { useEffect, useState } from 'react'
import uuid from 'uuid'
import './App.css'

const ws = new WebSocket('ws://192.168.6.205:8080')

ws.onopen = function open() {
  ws.send('something')
}

ws.onmessage = function incoming(data) {
  console.log(data)
}

const arr = [0, 1, 2, 3, 5, 8, 13, 21, 34, 99]

function App() {
  const [id, setId] = useState()

  useEffect(() => {
    setId(localStorage.getItem('uuid'))

    if (!id) {
      const uid = uuid()
      setId(uid)
      localStorage.setItem('uuid', uid)
    }
  }, [])

  const onClick = num => () => {
    const payload = {
      [id]: num
    }
    ws.send(JSON.stringify(payload))
    console.log('payload', payload)
  }
  return (
    <div className="app">
      {arr.map(x => (
        <button className="card" onClick={onClick(x)}>
          {x}
        </button>
      ))}
    </div>
  )
}

export default App
