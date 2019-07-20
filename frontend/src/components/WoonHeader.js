import React, { Component } from 'react'
import { Box, Button, Text,Anchor,DropButton } from 'grommet'
import WoonLogin from './User/WoonLogin'
import defaultProfile from '../assets/images/default-profile-icon.jpg'
class WoonHeader extends Component {
  state = { open: false, reload: false }
  constructor (props) {
    super(props)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
    this.mypage = this.mypage.bind(this)
  }
  onOpen = () => this.setState({ open: true })
  onClose = () => this.setState({ open: false })
  LoginClose = () => {
    this.setState({
      open: !this.state.open
    })
  }

  renderItems = () => (
    <Box>
      <Anchor href='/mypage'>마이페이지</Anchor>
      <Anchor onClick={this.logout}>로그아웃</Anchor>
    </Box>
  );

  render () {
    const temp = sessionStorage.getItem('loginId')

    const { open } = this.state

    let loginArea =
      temp == null ? (
        <Button className='test primary' onClick={this.onOpen}>
          로그인
        </Button>
      ) : (
        // (<Button className='test primary' onClick={this.logout}>로그아웃</Button>)
        <DropButton
              alignSelf="center"
              margin={{ vertical: "small" }}
              dropContent={this.renderItems()}
              dropProps={{ align: { top: "bottom" } }}
            >
              <Box
                height="36px"
                width="36px"
                round="full"
                background="url(//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80)"
                // texture="url(//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80)"
              />
            </DropButton>
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
    this.setState({ reload: !this.state.reload })
  }
  logout = () => {
    alert('로그아웃 완료')
    sessionStorage.clear()
    this.check()
    // this.props.history.push("/")
  }
  mypage = (e) => {
    e.preventDefault()
    window.location = 'mypage';
  }
}

export default WoonHeader
