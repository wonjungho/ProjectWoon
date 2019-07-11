import React,{Component} from 'react'
import {Box} from 'grommet'
import WoonChat from './WoonChat'
import WoonSignUp from './WoonSignUp'

class WoonMain extends Component{
    render(){
        return(
            <Box gridArea="main" justify="center" align="center">
                <WoonChat></WoonChat>
            </Box>
        )
    }
}

export default WoonMain