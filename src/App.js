import React from 'react'
import './App.css'

const ws = new WebSocket('ws://localhost:8080')

ws.onopen = function open() {
  ws.send('something')
}

ws.onmessage = function incoming(data) {
  console.log(data)
}

const arr = [0, 1, 2, 3, 5, 8, 13, 21, 34, 99]

function App() {
  const onClick = num => () => {
    ws.send(num)
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
