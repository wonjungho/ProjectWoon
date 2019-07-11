import React,{Component} from 'react'
import {Box,Text,Anchor} from 'grommet'
import {AddCircle} from 'grommet-icons'

class WoonUser extends Component{
    render(){
        return(
            <Box margin={{ top:"50%" }}>
                   <Box margin={{ bottom:"50%" }}>
              <Box pad={{ horizontal: "medium", vertical: "small" }} direction="row">
              <Text className="test" margin={{top:"12px",right:"60px"}} >User </Text><Anchor icon={<AddCircle />} color="white"/>
              </Box>    
            </Box>
                  </Box>
        )
    }
}
export default WoonUser