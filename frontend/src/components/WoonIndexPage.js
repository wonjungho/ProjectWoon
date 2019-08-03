import React, { Component } from 'react'
import { Video, Box } from 'grommet'
import video from '../assets/images/video.mp4'
import Typer from './WoonTyping'

class WoonIndexPage extends Component {
  render () {
    let bigvideo = {
      position: 'fixed',
      right: '0',
      minWidth: '100%'
    }
    let content2 = {
      position: 'fixed',
      textAlign: 'center',
      minWidth: '100%',
      minHeight: '94%'
    }
    return (
      <>
        <Video
          autoPlay='true'
          mute='true'
          loop='true'
          controls='false'
          style={bigvideo}
        >
          <source src={video} type='video/mp4' />
        </Video>
        <Box
          background={{ color: 'dark-1', opacity: 'strong' }}
          style={content2}
          border={{ size: 'xlarge', color: 'black' }}
        />
        <Box className='content' pad={{ bottom: '20%', right: '20%' }}>
          <Typer
            heading={'Hello'}
            dataText={[
              'This is Woon',
              '어서와! 운은 처음이지?',
              'Cowork with Woon',
              'WorkingTogether!',
              '우리 일같이할래?',
              'Study with Woon',
              'StudyTogether!',
              '우리 공부같이할래?'
            ]}
          />
        </Box>
      </>
    )
  }
}

export default WoonIndexPage
