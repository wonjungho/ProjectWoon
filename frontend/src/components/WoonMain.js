import React,{Component} from 'react'
import {Box} from 'grommet'
import WoonChat from './Chat/WoonChat'
import WoonSignUp from './User/WoonSignUp'
import Video from './Video/Video'
import WoonMyPage from './User/WoonMyPage'
import { BrowserRouter, Route } from 'react-router-dom';

class WoonMain extends Component{
    render(){
        return(
            // <BrowserRouter>
            <Box gridArea="main" justify="center" align="center">
                <Route path="/chat" exac component={WoonChat}/>
                <Route path="/signup" exac component={WoonSignUp}/>
                <Route path="/video" exact component={Video}/>
                <Route path="/mypage" exact component={WoonMyPage}/>
            </Box>
            // </BrowserRouter>
        )
    }
}

export default WoonMain