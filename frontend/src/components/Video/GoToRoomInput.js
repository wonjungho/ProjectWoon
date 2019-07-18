    
import React, { useState } from 'react'
import shortId from 'shortid'

const goToRoom = (history, roomId) => {
  history.push(`/video/${roomId}`)
}


export function GoToRoomInput({history}) {
  let [roomId, setRoomId] = useState(shortId.generate());

  return (<div className="enter-room-container">
    <form>
          <input type="text" value={roomId} placeholder="Room id" onChange={(e) => {
            setRoomId(e.target.value)
          }}/>
          <button onClick={() => {
            goToRoom(history, roomId)
          }}>Enter</button>
          </form>
        </div>)
}
