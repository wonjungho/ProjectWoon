import React, { Component } from 'react'
import { Box, Anchor, Text, DropButton } from 'grommet'
import { AddCircle, CircleInformation } from 'grommet-icons'
import WoonGroupInvite from './WoonGroupInvite'
import axios from 'axios'

class WoonGroupList extends Component {
  state = {
    open: false,
    reload: false,
    items: [],
    groupLeader: '',
    groupno: '',
    temp: ''
  }
  constructor (props) {
    super(props)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  onOpen = () => this.setState({ open: true })
  onClose = () => this.setState({ open: false })
  GroupClose = () => {
    this.setState({
      open: !this.state.open
    })
  }
  renderDropContent_1 = groupno => {
    return (
      <Box>
        <Anchor href='/groupmodipage'>그룹수정</Anchor>
        <Anchor onClick={this.delGroup(groupno)}>그룹삭제</Anchor>
        <Anchor>채팅방 참여</Anchor>
      </Box>
    )
  }
  renderDropContent_0 = groupno => {
    return (
      <Box>
        <Anchor>채팅방 참여</Anchor>
        <Anchor onClick={this.withdrawGroup(groupno)}>그룹 탈퇴</Anchor>
      </Box>
    )
  }

  render () {
    this.showList()
    const temp = sessionStorage.getItem('loginId')
    const { open } = this.state
    const groupListArea =
      temp == null ? (
        <Box direction='row'>
          <Text>가입한 그룹 없음</Text>
        </Box>
      ) : (
        this.state.items.map((item, index) => (
          <Box key={index} direction='row'>
            <Text className='test'>{item[2]}</Text>
            <DropButton
              alignSelf='center'
              margin={{ vertical: 'small' }}
              dropContent={
                item[3] === '1'
                  ? this.renderDropContent_1(item[0])
                  : this.renderDropContent_0(item[0])
              }
              dropProps={{ align: { top: 'bottom' } }}
            >
              <Anchor icon={<CircleInformation />} color='white' />
            </DropButton>
          </Box>
        ))
      )
    return (
      <Box margin={{ bottom: '50%' }}>
        <Box pad={{ horizontal: 'medium', vertical: 'small' }} direction='row'>
          <h2>temp:{this.props.temp}</h2>
          <Text className='test' margin={{ top: '12px', right: '60px' }}>
            Group{' '}
          </Text>
          <Anchor icon={<AddCircle />} color='white' onClick={this.onOpen} />
          {open && <WoonGroupInvite onClick={this.GroupClose} />}
        </Box>
        {groupListArea}
      </Box>
    )
  }
  check = () => {
    this.setState({ reload: !this.state.reload })
  }
  showList = () => {
    let loginId = sessionStorage.getItem('loginId')
    axios
      .get(`http://13.125.131.15/groups/list/${loginId}`)
      .then(res => {
        this.setState({
          items: res.data,
          temp: this.props.temp
        })
      })
      .catch(e => {
      })
  }
  // 그룹 가입
  joinGroup (groupno) {
    let loginId = sessionStorage.getItem('loginId')
    axios
      .get(`http://13.125.131.15/groups/${loginId}/${groupno}`)
      .then(res => {
        alert('SUCCESS')
      })
      .catch(e => {
        alert('ERROR')
      })
  }

  // 그룹 삭제
  delGroup (groupno) {
    const gn = groupno

    function axiosDel () {
      axios.delete(`http://13.125.131.15/groups/delete/${gn}`)
    }
    return axiosDel
  }
  // 그룹 탈퇴
  withdrawGroup (groupno) {
    const loginId = sessionStorage.getItem('loginId')
    const gn = groupno
    function axioWithdraw () {
      axios.delete(`http://13.125.131.15/groups/delete/${loginId}/${gn}`)
    }
    return axioWithdraw
  }
}
export default WoonGroupList
