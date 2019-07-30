import React,{Component} from 'react'
import {Box,Text,Anchor} from 'grommet'
import {AddCircle} from 'grommet-icons'
import WoonUserInvite from './WoonUserInvite'

class WoonUser extends Component{
  state={
    useropen:false,
    userEmail:''
  }    
  constructor(){
        super()
        this.onUserOpen=this.onUserOpen.bind(this)
        this.onUserClose=this.onUserClose.bind(this)
      }
      onUserOpen=()=>{
        this.setState({useropen:true})
      }
      onUserClose=()=>this.setState({useropen:!this.state.useropen})
    render(){
      const{useropen} =this.state
        return(
            <Box>
                   <Box margin={{ bottom:"50%" }}>
              <Box pad={{ horizontal: "medium", vertical: "small" }} direction="row">
              <Text className="test" margin={{top:"12px",right:"60px"}} >User </Text>
              <Anchor icon={<AddCircle />} color="white" onClick={this.onUserOpen}/>
              {useropen&&(
                <WoonUserInvite onClick={this.onUserClose}/>
              )}
              </Box>    
            </Box>
                  </Box>
        )
    }
}
export default WoonUser