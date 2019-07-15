import React,{Component} from 'react'

class WoonChatMessages extends Component{
    render(){
        const{messages} =this.props
        return(
            <div>
                {messages.map(m=>this.renderMessage(m))}
            </div>

        )
    }
    renderMessage(message) {
        const {memeber,text} =message;
        const {currentMember} =this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = meesageFromMe ?
            "Messages-message currentMember" : "Messages-message"
        return(
            <li className={className}>
        <span
            className="avatar"
            style={{backgroundColor: member.clientData.color}}
        />
        <div className="Message-content">
        <div className="username">
            {member.clientData.username}
        </div>
        <div className="text">{text}</div>
        </div>
        </li>
        )
    }
}

export default WoonChatMessages