import React,{Component} from 'react'
import {Box,Button,Text} from 'grommet'
import WoonLogin from './User/WoonLogin'
class WoonHeader extends Component{
    state={open:false}
    constructor(props){
      super(props)
      this.onOpen=this.onOpen.bind(this)
      this.onClose=this.onClose.bind(this)
    }
    onOpen=()=>this.setState({open:true})
    onClose=()=>this.setState({open:false})
    LoginClose=()=>{
      this.setState({
        open:!this.state.open
      })
    }
    render(){
        const{open} =this.state
        return(
              <Box
                gridArea="header"
                direction="row"
                align="center"
                justify="between"
                pad={{ horizontal: "medium", vertical: "small" }}
                background="#285943"
              >
                <Button>
                  <Text size="large" className="test">Woon</Text>
                </Button>
                <Button className="test primary" onClick={this.onOpen}>로그인</Button>
                {open&&(
                  <WoonLogin onClick={this.LoginClose}/>
                )}
              </Box>
        )
    }
    
}

export default WoonHeader