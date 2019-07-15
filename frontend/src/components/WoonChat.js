import React,{Component} from 'react'
import {Box,Text,Button, TextInput} from 'grommet'
import {SettingsOption,Add} from 'grommet-icons'
class WoonChat extends Component{

  onChange(e){
    this.setState({text:e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    this.setState({text:""})
    this.props.onSendMessage(this.state.text);
  }


  constructor(props){
    super(props)
    this.state={
      text: ""
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
          <TextInput value={this.state.text} onChange={e=>this.onChange(e)}></TextInput>
          <Button color="#8CD790"  label="send" onClick={e=>this.onSubmit(e)}/>
        </Box>
        </Box>
        )
    }
}

export default WoonChat