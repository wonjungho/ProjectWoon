import React,{Component} from 'react'
import main from '../assets/images/main.svg'
import { Box,Text } from 'grommet';

class WoonIndexPage extends Component{
    render(){
        return(
            <Box>
            <Text className="test2">다같이 개발해봐요!</Text>
            <img src={main}></img>
            </Box>
        )
    }
}

export default WoonIndexPage