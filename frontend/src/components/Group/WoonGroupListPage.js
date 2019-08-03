import React, { Component } from 'react'
import { Box, Text, Anchor, Heading, DropButton } from 'grommet'
import { Attraction, AddCircle } from 'grommet-icons'
import WoonGroupInvite from './WoonGroupInvite'
import Swal from 'sweetalert2'
import axios from 'axios'
class WoonGroupListPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      reload: false,
      items: [],
      groupLeader: '',
      groupno: '',
      temp: ''
    }
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
        <Anchor href={'/woonrtc'}>채팅방 참여</Anchor>
        <Anchor href={`/groupmodipage/${groupno}`}>그룹수정</Anchor>
        <Anchor onClick={this.delGroup(groupno)}>그룹삭제</Anchor>
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

  // 그룹 삭제
  delGroup (groupno) {
    const gn = groupno

    function axiosDel () {
      Swal.fire({
        title: '삭제하시겠습니까?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then(result => {
        if (result.value) {
          axios.delete(`http://13.125.131.15/groups/delete/${gn}`).then(res => {
            Swal.fire('삭제가 완료되었습니다.')
            window.location.reload()
          })
        }
      })
    }
    return axiosDel
  }
  // 그룹 탈퇴
  withdrawGroup (groupno) {
    const loginId = sessionStorage.getItem('loginId')
    const gn = groupno
    function axioWithdraw () {
      Swal.fire({
        title: '탈퇴하시겠습니까?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '탈퇴',
        cancelButtonText: '취소'
      }).then(result => {
        if (result.value) {
          axios
            .delete(`http://13.125.131.15/groups/delete/${loginId}/${gn}`)
            .then(res => {
              Swal.fire('탈퇴가 완료되었습니다.')
              window.location.reload()
            })
        }
      })
    }
    return axioWithdraw
  }

  render () {
    const { open } = this.state
    const groupListArea = this.state.items.map((item, index) => (
      <Box
        pad='large'
        align='center'
        background={{ color: 'dark-2', opacity: 'strong' }}
        round
        gap='small'
      >
        <Attraction size='large' />
        <Text className='test2'>{item[2]}</Text>
        <DropButton
          label='Button'
          alignSelf='center'
          margin={{ vertical: 'small' }}
          dropContent={
            item[3] === '1'
              ? this.renderDropContent_1(item[0])
              : this.renderDropContent_0(item[0])
          }
          dropProps={{ align: { top: 'bottom' } }}
        />
      </Box>
    ))

    return (
      <Box className='grouplistPagewrapper' background='white' round>
        <Box direction='row' align='end' margin={{ top: '30px' }}>
          <Heading color='black'>그룹</Heading>
          <Anchor
            icon={<AddCircle />}
            color='black'
            margin={{ bottom: '30px' }}
            onClick={this.onOpen}
          />
          {open && <WoonGroupInvite onClick={this.GroupClose} />}
        </Box>
        <Box
          direction='row'
          justify='center'
          align='center'
          pad='large'
          background={{ color: 'white' }}
          gap='medium'
          round
          wrap
        >
          {groupListArea}
        </Box>
      </Box>
    )
  }
  componentDidMount () {
    let loginId = sessionStorage.getItem('loginId')
    axios.get(`http://13.125.131.15/groups/list/${loginId}`).then(res => {
      this.setState({ items: res.data })
    })
  }
}

export default WoonGroupListPage
