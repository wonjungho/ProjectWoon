import React, { Component } from 'react';
import {Box} from 'grommet'

class WoonMessageList extends Component {
    render() {
        return (
            <Box flex overflow="auto" pad="xsmall" id="messages">
                {this.props.messages.map((message, index) => (
                    <Box key={index} direction="row">
                        <h4 className="message-sender">{message.senderId}</h4>
                        <div className="message-text">{message.text}</div>
                    </Box>
                ))}
            </Box>
        )
    }
}
export default WoonMessageList;