import React,{Component} from 'react'
import {Box} from 'grommet'
import WoonChat from './Chat/WoonChat'
import WoonSignUp from './User/WoonSignUp'
import WoonFindPass from './User/WoonFindPass'
import WoonMyPage from './User/WoonMyPage'
import WoonIndexPage from './WoonIndexPage'
import WoonGroupListPage from './Group/WoonGroupListPage'
import WoonGroupModiPage from './Group/WoonGroupModiPage'
import { BrowserRouter, Route } from 'react-router-dom';

class WoonMain extends Component{
    render(){
        return(
            <BrowserRouter>
            <Box gridArea="main" justify="center" align="center">
                <Route path="/" exac component={WoonIndexPage}/>
                <Route path="/chat" exac component={WoonChat}/>
                <Route path="/signup" exac component={WoonSignUp}/>
                <Route path="/findpass" exac component={WoonFindPass}/>
                <Route path="/groupmodipage/:groupno" exac component={WoonGroupModiPage}/>
                <Route path="/mypage" exact component={WoonMyPage}/>
                <Route path="/grouplistpage" exact component={WoonGroupListPage}/>
            </Box>
            </BrowserRouter>
        )
    }
}

export default WoonMain