import React, { Component } from 'react'

class VideoOption extends Component {
    render() {
        return (
            <>
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

export default VideoOption