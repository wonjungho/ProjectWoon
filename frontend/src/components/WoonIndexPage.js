import React, { Component } from 'react'
import { Video,Box,Text, Heading,Button } from 'grommet'
import video from '../assets/images/video.mp4'
import '../assets/css/bigvideo.css'


class WoonIndexPage extends Component {
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
            <>
            <Video autoPlay="true" mute="true" loop="true" controls="false" className="bigvideo">
                <source src={video} type="video/mp4"></source>
            </Video>
            <Box background={{ color: "dark-1", opacity:"strong"}} className="content2"></Box>
            <Box className="content">
                <Heading size="xlarge" color="white" textAlign="center">Hello</Heading>
                <Heading size="large" color="white">The World Best Cowork TooL</Heading>
            </Box>
            </>
        )
    }
}

export default WoonIndexPage