import React,{Component} from 'react'
import {Box} from 'grommet'
import WoonGroupList from './Group/WoonGroupList'
import WoonUserList from  './User/WoonUserList'

class WoonSidebar extends Component{
  constructor(props){
    super(props);
    this.state={
      temp:''
    }      
  }
    render(){
      console.log('------------------------------')
      console.log(this.props.temp)
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
                    <WoonUserList/>
                  </Box>
                </Box>
        )
    }
}
export default WoonSidebar

