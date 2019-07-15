import React,{Component} from 'react'
import {Box,Text,Button, TextInput} from 'grommet'
import {SettingsOption,Add} from 'grommet-icons'
import io from "socket.io-client"
class WoonChat extends Component{

  constructor(props){
    super(props)
    this.state={
      message:'',
      messages:[]
    }
    this.socket =io('localhost:8080')
    this.sendMessage= ev=>{
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE',{
        message:this.state.message
      })
      this.setState({message:''})
    }
  }
    render(){
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
        <Box flex overflow="auto" pad="xsmall" id="messages">
          {this.state.messages.map(message=>{
            return(
              <div>{message.message}</div>
            )
          })}
        </Box>
        <Box
          as="footer"
          border={{ side: "top" }}
          pad="small"
          justify="end"
          direction="row"
          align="center"
        >
          <Button icon={<Add/>}/>
          <TextInput value={this.state.message}></TextInput>
          <Button color="#8CD790"  label="send" onClick={this.sendMessage}/>
        </Box>
        </Box>
        )
    }
}

export default WoonChat