import React, { Component } from 'react'
import { Box, Button, Text, Anchor, DropButton } from 'grommet'
import { createBrowserHistory } from 'history';
import WoonLogin from './User/WoonLogin'
import 'css/bigvideo.css'
import 'css/WoonHeader.css'
class WoonHeader extends Component {
  state = { open: false, reload: false }
  constructor (props) {
    const history = createBrowserHistory();
    super(props)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
    this.fn = props.fn
    // this.mypage = this.mypage.bind(this)
  }
  onOpen = () => {
    this.setState({ open: true })
  }
  onClose = () => this.setState({ open: false })
  LoginClose = () => {
    this.setState({
      open: !this.state.open
    })
  }

  renderItems = () => (
    <Box className='headerMenu'>
      <Anchor className='menulist' href='/mypage'>마이페이지</Anchor>
      <Anchor className='menulist' onClick={this.logout}>로그아웃</Anchor>
    </Box>
  )

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
          className='headerProfile'
          alignSelf='center'
          margin={{ vertical: 'small' }}
          dropContent={this.renderItems()}
          dropProps={{ align: { top: 'bottom' } }}
        >
          <Box
            height='29px'
            width='29px'
            round='full'
            background='url(//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80)'
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
        background='black'
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
        {open && <WoonLogin onClick={this.LoginClose} test={this.fn} />}
      </Box>
    )
  }

  check = () => {
    // alert('check')
    this.setState({ reload: !this.state.reload })
  }
  logout = () => {
    const history = createBrowserHistory()
    alert('로그아웃 완료')
    sessionStorage.clear()
    history.push("/")
    this.check()
    window.location.reload();
  }
}

export default WoonHeader
