import React, { Component } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Image,
  Form,
  FormField
} from 'grommet'
import Swal from 'sweetalert2'
import axios from 'axios'

class WoonMyPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      loginUser: '',
      curpass: '',
      modipass: '',
      modipasschk: '',
      selectedImg: ''
    }
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
    this.modipass = this.modipass.bind(this)
    this.changeImg = this.changeImg.bind(this)
  }
  onOpen = () => this.setState({ open: true })
  onClose = () => this.setState({ open: false })
  modiPassClose = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    let uploadBtn = {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      border: '0'
    }
    let uploadlabel = {
      margin: '0 16px',
      display: 'inline-block',
      boxSizing: 'border-box',
      cursor: 'pointer',
      outline: 'none',
      font: 'inherit',
      textDecoration: 'none',
      border: '2px solid #34a8eb',
      borderRadius: '18px',
      color: '#444444',
      padding: '4px 32px',
      fontSize: '18px',
      lineHeight: '24px',
      background: '#34a8eb',
      color: '#f8f8f8',
      borderRadius: '18px',
      WebkitTransition: '0.1s ease-in-out',
      transition: '0.1s ease-in-out',
      fontWeight: 'bold'
    }
    let fontcolor = {
      fontFamily: 'Nanum Gothic, sans-serif',
      fontWeight: 'bold',
      color: 'white'
    }
    let mypagewrapper = {
      position: 'fixed',
      width: '1350px',
      height: '650px',
      border: '1px solid black'
    }
    let mypageform = {
      display: 'table',
      marginLeft: '20%',
      position: 'fixed'
    }
    let profileImg =
      this.state.loginUser.profile == null
        ? 'https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg'
        : this.state.loginUser.profilePath

    let modiPassArea =
      this.state.open === false ? (
        <Button primary label='수정' onClick={this.onOpen} />
      ) : (
        <Form>
          <FormField
            name='curpass'
            type='password'
            placeholder='현재 비밀번호'
            onChange={this.handleChange}
          />
          <FormField
            name='modipass'
            type='password'
            placeholder='새로운 비밀번호'
            onChange={this.handleChange}
            validate={{
              regexp: /[A-Za-z0-9]{6,12}$/,
              message: '숫자를 포함한 6~12자리 비밀번호를 입력해주세요.'
            }}
          />
          <FormField
            name='modipasschk'
            type='password'
            placeholder='새로운 비밀번호 확인'
            onChange={this.handleChange}
            validate={{
              regexp: /[A-Za-z0-9]{6,12}$/,
              message: '숫자를 포함한 6~12자리 비밀번호를 입력해주세요.'
            }}
          />
          <Button primary label='변경하기' onClick={this.modipass} />
          <Button
            primary
            color='#777'
            label='취소'
            onClick={this.modiPassClose}
          />
        </Form>
      )

    return (
      <Box
        className='mypagewrapper'
        background='white'
        round
        style={mypagewrapper}
      >
        <Box
          width='large'
          className='mypageform'
          background='white'
          style={mypageform}
        >
          <Table>
            <TableHeader />
            <TableBody>
              <TableRow>
                <TableCell scope='row' pad='medium'>
                  <strong>아이디</strong>
                </TableCell>
                <TableCell>{this.state.loginUser.userEmail}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope='row' pad='medium'>
                  <strong>비밀번호</strong>
                </TableCell>
                <TableCell>
                  <Box align='center'>{modiPassArea}</Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope='row' pad='medium'>
                  <strong>이름</strong>
                </TableCell>
                <TableCell>{this.state.loginUser.userName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope='row' pad='medium'>
                  <strong>프로필</strong>
                </TableCell>
                <TableCell>
                  <Form>
                    <Box
                      className='imgbox'
                      height='small'
                      width='small'
                      style={{ marginBottom: '5px' }}
                    >
                      <Image
                        fit='cover'
                        src={profileImg}
                        alt='profile'
                        id='profile'
                      />
                    </Box>
                    <label id='uploadlabel' for='uploadBtn' style={uploadlabel}>
                      등록 / 변경
                    </label>
                    <input
                      id='uploadBtn'
                      style={uploadBtn}
                      type='file'
                      onChange={this.changeImg}
                    />
                  </Form>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box align='end'>
            <Button
              className='test'
              style={fontcolor}
              primary
              color='red'
              label='회원탈퇴'
              onClick={this.leave}
            />
          </Box>
        </Box>
      </Box>
    )
  }
  componentDidMount () {
    let loginId = sessionStorage.getItem('loginId')
    axios.get(`http://localhost:9000/users/mypage/${loginId}`).then(res => {
      this.setState({ loginUser: res.data })
    })
  }

  modipass = e => {
    e.preventDefault()

    if (this.state.curpass !== this.state.loginUser.password) {
      alert('현재 비밀번호가 일치하지 않습니다.')
    } else if (this.state.modipass !== this.state.modipasschk) {
      alert('변경할 비밀번호가 일치하지 않습니다.')
    } else {
      let data = {
        userEmail: this.state.loginUser.userEmail,
        password: this.state.modipass
      }
      let headers = {
        'Content-Type': 'application/json',
        Authorization: 'JWT fefege..'
      }
      axios
        .put(`http://localhost:9000/users/modi`, JSON.stringify(data), {
          headers: headers
        })
        .then(res => {
          alert('비밀번호가 수정되었습니다')
          this.setState({
            curpass: '',
            modipass: '',
            modipasschk: '',
            open: false
          })
        })
    }
  }

  leave = e => {
    let loginId = sessionStorage.getItem('loginId')
    e.preventDefault()
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
          .delete(`http://localhost:9000/users/delete/${loginId}`)
          .then(res => {
            sessionStorage.clear()
            Swal.fire('탈퇴가 완료되었습니다.')
            this.props.history.push('/')
            window.location.reload()
          })
      }
    })
  }

  handleChange = e => {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  }

  changeImg = e => {
    this.setState({ selectedImg: e.target.files[0] })

    let data = new FormData()
    data.append('file', e.target.files[0])
    data.append('user', this.state.loginUser.userEmail)

    let fileReader = new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload = function (e) {
      document.getElementById('profile').src = e.target.result
      setTimeout(function () {
        Swal.fire({
          position: 'top',
          title: '수정하시겠습니까?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '확인'
        }).then(result => {
          if (result.value) {
            const headers = {
              'Content-Type': 'multipart/form-data',
              Authorization: 'JWT fefege..'
            }
            axios
              .post(`http://localhost:9000/users/modiprofile`, data, {
                headers: headers
              })
              .then(res => {
                alert('프로필이 등록되었습니다.')
                sessionStorage.setItem('loginProfile', res.data.profilePath)
                window.location.reload()
              })
              .catch(e => {
                alert('프로필 수정을 실패하였습니다.')
              })
          }
        })
      }, 50)
    }
  }
}
export default WoonMyPage