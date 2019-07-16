import React, { Component } from 'react'
import {Layer,Box,Heading,Button,Anchor,FormField,TextInput} from 'grommet'
import { Close } from 'grommet-icons'
import axios from 'axios'

class WoonLogin extends Component {
  state = {
    sidebar: true,
    open: false,
    select: '',
    userEmail: '',
    password: ''
  }
  // constructor (props) {
  //   super(props)
  // }
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
          // onSubmit={this.onClose}
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
            <Button
              // type='submit'
              label='로그인'
              onClick={this.login}
              primary
            />
          </Box>
          <Box flex={false} as='footer' align='center'>
            <Anchor href='/signup'>SignUp</Anchor>/<Anchor>FindMyInfo</Anchor>
          </Box>
        </Box>
      </Layer>
    )
  }
  login = e => {
    e.preventDefault()
    let data = {
      userEmail: this.state.userEmail,
      password: this.state.password
    }
    console.log(data)
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .post(`http://localhost:9000/users/login`, JSON.stringify(data), { headers: headers })
      .then(res => {
        alert('로그인되었습니다.')
        this.onClose()
        // this.props.history.push('/chat')
      })
      .catch(e => {
        alert('회원가입실패')
      })
  }
  /* handleChange = e => {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  } */
  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
    console.log("userEmail: "+this.state.userEmail)
    console.log("pass: "+this.state.password)
  }
}

export default WoonLogin
