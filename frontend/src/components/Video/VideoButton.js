import React, { Component } from 'react'

class VideoButton extends Component {
    render() {
        return (
            <>
                <div class="box">
                    <button id="startButton" onClick={this.start}>Start</button>
                    <button id="callButton" onclick={this.call}>Call</button>
                    <button id="hangupButton" onClick={this.hangup}>Hang Up</button>
                </div>
            </>
        )
    }
    

}

export default VideoButton