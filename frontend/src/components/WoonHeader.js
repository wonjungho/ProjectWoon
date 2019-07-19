import React, { Component } from 'react'
import { Box, Button, Text } from 'grommet'
import WoonLogin from './User/WoonLogin'
class WoonHeader extends Component {
  state = { open: false, reload: false }
  constructor (props) {
    super(props)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  onOpen = () => this.setState({ open: true })
  onClose = () => this.setState({ open: false })
  LoginClose = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const temp = sessionStorage.getItem('loginId')
    console.log(temp)
    const { open } = this.state

    let loginArea =
      temp == null ? (
        <Button className='test primary' onClick={this.onOpen}>
          로그인
        </Button>
      ) : (
        <Button className='test primary' onClick={this.logout}>
          로그아웃
        </Button>
      )
    return (
      <Box
        gridArea='header'
        direction='row'
        align='center'
        justify='between'
        pad={{ horizontal: 'medium', vertical: 'small' }}
        background='#285943'
      >
        <Button>
          <Text size='large' className='test'>
            Woon
          </Text>
        </Button>
        {/* <Button className='test primary' onClick={this.onOpen}>
          로그인
        </Button> */}
        {loginArea}
        {open && <WoonLogin onClick={this.LoginClose} />}
      </Box>
    )
  }
  check = () => {
    alert('check')
    this.setState({ reload: true })
  }
  logout = () => {
    alert('로그아웃 완료')
    sessionStorage.clear()
    this.check()
    // this.props.history.push("/")
  }
}

export default WoonHeader
