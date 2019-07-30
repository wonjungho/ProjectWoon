import React, { Component } from 'react'
import { Video, Box, Text, Heading, Button } from 'grommet'
import video from '../assets/images/video.mp4'
import Typer from './WoonTyping'
import '../assets/css/bigvideo.css'


class WoonIndexPage extends Component {
   
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <Video autoPlay="true" mute="true" loop="true" controls="false" className="bigvideo">
                    <source src={video} type="video/mp4"></source>
                </Video>
                <Box background={{ color: "dark-1", opacity: "strong" }} className="content2" border={{ color: "black", size: "xlarge" }}></Box>
                <Box className="content" pad={{bottom:"20%",right:"20%"}}>
                    <Typer
                    heading={'Hello'}
                    dataText={["This is Woon","어서와! 운은 처음이지?","Cowork with Woon","WorkingTogether!","우리 일같이할래?","Study with Woon","StudyTogether!","우리 공부같이할래?"]}
            
                    />
                </Box>
            </>
        )
    }
}

export default WoonIndexPage