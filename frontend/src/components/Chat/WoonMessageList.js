import React, { Component } from 'react';
import {Box} from 'grommet'

class WoonMessageList extends Component {
    render() {
        return (
            <Box flex overflow="auto" pad="xsmall" id="messages">
                {this.props.messages.map((message, index) => (
                    <div key={index}>
                        <h4 className="message-sender">{message.senderId}</h4>
                        <div className="message-text">{message.text}</div>
                    </div>
                ))}
            </Box>
        )
    }
}
export default WoonMessageList;