import React,{Component} from 'react'
import {Box,Anchor,Text} from 'grommet'
import {AddCircle} from 'grommet-icons'
import WoonGroupInvite from './WoonGroupInvite'

class WoonGroupList extends Component{
    state={open:false,
    }
    constructor(props){
      super(props)
      this.onOpen=this.onOpen.bind(this)    
      this.onClose=this.onClose.bind(this)
    }
    onOpen=()=>this.setState({open:true})
    onClose=()=>this.setState({open:false})
    GroupClose=()=>{
      this.setState({
        open:!this.state.open
      })
    }
    render(){
      const{open} =this.state
        return(
            <Box margin={{ bottom:"50%" }}>
              <Box pad={{ horizontal: "medium", vertical: "small" }} direction="row">
              <Text className="test" margin={{top:"12px",right:"60px"}} >Group </Text>
              <Anchor icon={<AddCircle />} color="white" onClick={this.onOpen}/>
              {open&&(
                <WoonGroupInvite onClick={this.GroupClose}/>
              )}
              </Box>    
            </Box>
        )
    }
}
export default WoonGroupList