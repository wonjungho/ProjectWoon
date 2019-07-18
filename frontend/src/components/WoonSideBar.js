import React,{Component} from 'react'
import {Box} from 'grommet'
import WoonGroupList from './Group/WoonGroupList'
import WoonUserList from  './User/WoonUserList'

class WoonSidebar extends Component{
    render(){
        return(
                <Box
                  gridArea="sidebar"
                  background="#77AF9C"
                  width="small"
                  animation={[
                    { type: "fadeIn", duration: 300 },
                    { type: "slideRight", size: "xlarge", duration: 150 }
                  ]}
                >
                  <Box>
                    <WoonGroupList/>
                    <WoonUserList/>
                  </Box>
                </Box>
        )
    }
}
export default WoonSidebar

