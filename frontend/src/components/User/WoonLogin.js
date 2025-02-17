import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import {
  Layer,
  Box,
  Heading,
  Button,
  Anchor,
  FormField,
  TextInput
} from 'grommet'
import { Close } from 'grommet-icons'
import axios from 'axios'

class WoonLogin extends Component {
  state = {
    open: false,
    select: '',
    userEmail: '',
    password: ''
  }

  onOpen = () => this.setState({ open: true })
  onClose = () => {
    this.setState({ open: false })
    this.props.onClick()
  }
  render () {
    return (
      <Layer
        position='center'
        height='medium'
        modal
        onClickOutside={this.onClose}
        onEsc={this.onClose}
      >
        <Box
          as='form'
          fill='vertical'
          overflow='auto'
          width='medium'
          height='small'
          pad='medium'
        >
          <Box flex={false} direction='row' justify='between'>
            <Heading level={2} margin='none'>
              로그인
            </Heading>
            <Button icon={<Close />} onClick={this.onClose} />
          </Box>
          <Box flex='grow' overflow='auto' pad={{ vertical: 'medium' }}>
            <FormField label='Email'>
              <TextInput
                name='userEmail'
                onChange={this.handleChange}
                required
              />
            </FormField>
            <FormField label='password'>
              <TextInput
                name='password'
                type='password'
                onChange={this.handleChange}
                required
              />
            </FormField>
          </Box>
          <Box flex={false} as='footer' align='center'>
            <Button type='submit' label='로그인' onClick={this.login} primary />
          </Box>
          <Box flex={false} as='footer' align='center'>
            <Anchor href='/signup'>SignUp</Anchor>/
            <Anchor href='/findpass'>FindMyInfo</Anchor>
          </Box>
        </Box>
      </Layer>
    )
  }
  login = e => {
    const history = createBrowserHistory()
    e.preventDefault()
    let data = {
      userEmail: this.state.userEmail,
      password: this.state.password
    }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'JWT fefege..',
      'Access-Control-Allow-Origin': '*'
    }
    axios
      .post(`http://localhost:9000/users/login`, JSON.stringify(data), {
        headers: headers
      })
      .then(res => {
        alert('로그인되었습니다.')
        sessionStorage.setItem('loginId', res.data.userEmail)
        sessionStorage.setItem('loginName', res.data.userName)
        sessionStorage.setItem('loginProfile', res.data.profilePath)
        history.push('/grouplistpage')
        this.onClose()
        window.location.reload()
      })
      .catch(e => {
        alert('로그인을 실패하였습니다.')
      })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
}

export default WoonLogin
