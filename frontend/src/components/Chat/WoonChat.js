import React,{Component} from 'react'
import {Box,Text} from 'grommet'
import {SettingsOption} from 'grommet-icons'
import ChatApp from './WoonChatApp'
import ChatMessage from './WoonChatInput'
import Signup from './WoonChatSignup'
import {default as Chatkit} from '@pusher/chatkit-server'

const chatkit = new Chatkit({
  instanceLocator:"v1:us1:33c87227-c65f-4548-a524-8f1590d7e617",
  key:"d9da8246-862e-4f30-9915-a074a2cd53c1:LB5AizmACyJnDyANal1Sk7PqfRLxb2CXzf9KIPgaGjI="
})
class WoonChat extends Component{
  constructor(props){
    super(props)
    this.state ={
      currentUsername:'',
      currentId:'',
      currentView:'signup'
    }
    this.changeView=this.changeView.bind(this)
    this.createUser = this.createUser.bind(this);
  }
  createUser(username) {
    chatkit.createUser({
        id: username,
        name: username,
    })
    .then((currentUser) => {
        this.setState({
            currentUsername: username,
            currentId: username,
            currentView: 'chatApp'
        })
    }).catch((err) => {
             if(err.status === 400) {
            this.setState({
                currentUsername: username,
                currentId: username,
                currentView: 'chatApp'
            })
        } else {
            console.log(err.status);
        }
    });
}
  changeView(view){
    this.setState({
      currentView:view
    })
  }
    render(){
      let view ='';
      if (this.state.currentView === "ChatMessage") {
        view = <ChatMessage  changeView={this.changeView}/>
      } else if (this.state.currentView === "signup") {
        view = <Signup onSubmit={this.createUser}/>
      } else if (this.state.currentView === "chatApp") {
        view = <ChatApp currentId={this.state.currentId} />
      }
        return(
            <Box fill style={{ minWidth: "378px" }}>
          <Box
          direction="row"
          align="center"
          as="header"
          elevation="medium"
          justify="between"
        >
          <Text margin={{ left: "medium" }} className="test1">ProjectWoon</Text>
          <Text className="test2">그룹원수: 36</Text>
          <SettingsOption size ="large" color="#519D9E" />
        </Box>
        <Box flex overflow="auto" pad="xsmall">
        {view}
        </Box>
       
        </Box>
        )
    }
    onSendMessage = (message) => {
      this.drone.publish({
        room: "observable-room",
        message
      });
    }
}

export default WoonChat