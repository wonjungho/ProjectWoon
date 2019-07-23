import React from "react";
import WebRTCClient from "iotcomms-react-webrtc";
import ReactQueryParams from "react-query-params";

class Video extends ReactQueryParams{
    constructor(props,context) {
        super(props,context);
      }
      //Note these video elements must be present with the remoteVideo and localVideo id's to
      //have place to render video for the WebRTCClient component
      render() {
        return (
        <div className="container">
        <h1 className="heading">Room example</h1>
        <p className="note">
          Change Room mode (before join in a room):
        <a href="#">mesh</a> / <a href="#sfu">sfu</a>
        </p>
        <div className="room">
        <div>
          <video id="js-local-stream"></video>
          <input type="text" placeholder="Room Name" id="js-room-id"></input>
          <button id="js-join-trigger">Join</button>
          <button id="js-leave-trigger">Leave</button>
        </div>
        <div className="remote-streams" id="js-remote-streams"></div>
        <div>
          <pre className="messages" id="js-messages"></pre>
          <input type="text" id="js-local-text"></input>
          <button id="js-send-trigger">Send</button>
        </div>
      </div>
    </div>
        );
      }
}


export default Video