import React,{Component} from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './WoonChatInput'
import MessageList from './WoonMessageList'
import {Box} from 'grommet'
class WoonChatMessages extends Component{
  constructor(props){
    super(props)
    this.state={
      currentUser: null,
      currentRoom: {users:[]},
      messages: [],
      users: []
    }
    this.addMessage =this.addMessage.bind(this)
  }
  componentDidMount() {
    const chatManager = new ChatManager({
        instanceLocator: "v1:us1:33c87227-c65f-4548-a524-8f1590d7e617",
        userId: this.props.currentId,
        tokenProvider: new TokenProvider({
            url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/33c87227-c65f-4548-a524-8f1590d7e617/token"
        })
    })
    chatManager
                .connect()
                .then(currentUser => {
                    this.setState({ currentUser: currentUser })
                    return currentUser.subscribeToRoom({
                        roomId: "20093294",
                        messageLimit: 100,
                        hooks: {
                            onMessage: message => {
                                this.setState({
                                    messages: [...this.state.messages, message],
                                })
                            },
                        }
                    })
                })
                .then(currentRoom => {
                    this.setState({
                        currentRoom,
                        users: currentRoom.userIds
                    })
                })
                .catch(error => console.log(error))
  }
    addMessage(text) {
      this.state.currentUser.sendMessage({
        text,
        roomId: this.state.currentRoom.id
    })
    .catch(error => console.error('error', error));
    }
    render(){
        return(
          <Box>
            <MessageList messages={this.state.messages} />
            <Input className="input-field" onSubmit={this.addMessage}/>
          </Box>

        )
    }
}

export default WoonChatMessages