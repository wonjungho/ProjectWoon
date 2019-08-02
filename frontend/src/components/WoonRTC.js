import React,{Component} from 'react'
import {Box} from 'grommet'

class WoonRTC extends Component{
    render(){
        let RTCwrapper={
            position:"fixed",
            width: "1350px",
            height: "650px",
            border: "1px solid black",
            background:"white"
          }
        return(
            <Box style={RTCwrapper}>
            <iframe src="https://appr.tc" frameborder="2" style={{width:"1350px",height:"650px"}}>
            </iframe>
            </Box>
        );
    }
}
export default WoonRTC