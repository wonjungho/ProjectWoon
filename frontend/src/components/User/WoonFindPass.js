import React, { Component } from 'react'
import { Box, Form, FormField, Button, Heading } from 'grommet'
import { createBrowserHistory } from 'history'
import tttt from '../../assets/images/main.svg'
import axios from 'axios'

class WoonFindPass extends Component {
  state = {
    finduserEmail: '',
    finduserName: '',
    findbtn: 'false',
    temppass: '',
    updatepass: '',
    updatepasschk: ''
  }
  render () {
    let buttonarea = {
      marginLeft: '10%'
    }
    return (
      <Box
        direction='row'
        pad='xlarge'
        className='findpassword'
        background={{ color: 'white' }}
        round
      >
        <Box width='medium' id='dddd'>
          <Form>
            <Heading level={2} margin='none'>
              비밀번호 찾기
            </Heading>
            <FormField
              name='finduserEmail'
              type='email'
              onChange={this.handleChange}
              placeholder='등록된 Email 아이디'
              required
            />
            <FormField
              name='finduserName'
              type='text'
              required
              onChange={this.handleChange}
              placeholder='이름'
            />
            <Box direction='row' style={buttonarea}>
              <Button
                id='findBtn'
                type='button'
                label='임시비밀번호 발급받기'
                primary
                onClick={this.getTempPass}
              />
              <Button
                className='test'
                type='button'
                label='취소'
                primary
                color='#777'
                onClick={this.main}
              />
            </Box>
          </Form>
        </Box>
        <Box align='end' id='monkey'>
          <img src={tttt} alt='' />
        </Box>
      </Box>
    )
  }
  getTempPass = e => {
    e.preventDefault()
    let data = {
      userEmail: this.state.finduserEmail,
      userName: this.state.finduserName
    }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'JWT fefege..'
    }
    axios
      .post(`http://13.125.131.15/users/findpass`, JSON.stringify(data), {
        headers: headers
      })
      .then(res => {
        alert(
          '입력하신 이메일로 임시 비밀번호가 전송되었습니다.\n해당 임시 비밀번호로 로그인 후 비밀번호 변경을 진행해주세요.'
        )
        this.props.history.push('/')
      })
      .catch(e => {
        alert('입력하신 정보에 해당되는 아이디가 없습니다.')
      })
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  main = e => {
    const history = createBrowserHistory()
    e.preventDefault()
    history.push('/')
    window.location.reload()
  }
}

export default WoonFindPass
