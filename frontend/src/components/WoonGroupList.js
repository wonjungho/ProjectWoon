import React,{Component} from 'react'
import {Box,Text,Button} from 'grommet'
import {AddCircle} from 'grommet-icons'

class WoonGroupList extends Component{
    render(){
        return(
            <Box margin={{ bottom:"50%" }}>
              <Box pad={{ horizontal: "medium", vertical: "small" }}>
              <Text className="test" margin="vertical">그룹</Text><AddCircle/>
              </Box>    
            </Box>
        )
    }
}
export default WoonGroupList