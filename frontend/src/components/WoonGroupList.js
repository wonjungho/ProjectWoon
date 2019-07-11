import React,{Component} from 'react'
import {Box,Anchor,Text} from 'grommet'
import {AddCircle} from 'grommet-icons'

class WoonGroupList extends Component{
    render(){
        return(
            <Box margin={{ bottom:"50%" }}>
              <Box pad={{ horizontal: "medium", vertical: "small" }} direction="row">
              <Text className="test" margin={{top:"12px",right:"60px"}} >Group </Text><Anchor icon={<AddCircle />} color="white"/>
              </Box>    
            </Box>
        )
    }
}
export default WoonGroupList