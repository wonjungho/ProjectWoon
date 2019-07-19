import React, { Component } from 'react'
import './VideoFunction.js'

class Video extends Component {
    state = {
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <video id="localVideo" playsinline autoplay muted ></video>
                <video id="remoteVideo" playsinline autoplay ></video>

                <div class="box">
                    <button id="startButton" >Start</button>
                    <button id="callButton" >Call</button>
                    <button id="hangupButton" >Hang Up</button>
                </div>
                <div class="box">
                    <span>SDP Semantics:</span>
                    <select id="sdpSemantics">
                        <option selected value="">Default</option>
                        <option value="unified-plan">Unified Plan</option>
                        <option value="plan-b">Plan B</option>
                    </select>
                </div>
            </>
        )
    }
    
}

export default Video