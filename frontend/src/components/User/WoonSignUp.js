import React, { Component } from 'react'
import { Box, Form, FormField, Button, Heading } from 'grommet'
import axios from 'axios'

class WoonSignUp extends Component {
  state = {
    userEmail: '',
    password: '',
    userName: '',
    profile: ''
  }
  // constructor (props) {
  //   super(props)
  // }
  render () {
    return (
      <div>
        <Box width='large'>
          <Form>
            <Heading level={2} margin='none'>
              회원가입
            </Heading>
            <FormField label='Email' name='userEmail' type='email' onChange={this.handleChange} required />
            <FormField
              label='Password'
              name='password'
              type='password'
              required
              onChange={this.handleChange}
              // validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
            />
            <FormField
              label='Name'
              name='userName'
              type='text'
              required
              onChange={this.handleChange}
              // validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
            />
            <FormField label='Photo' name='profile' type='file' onChange={this.handleChange} />
            <Button type='submit' label='SignUp' primary onClick={this.signup}/>
          </Form>
        </Box>
      </div>
    )
  }
  signup = e => {
    e.preventDefault()

    const data = {
      userEmail: this.state.userEmail,
      password: this.state.password,
      userName: this.state.userName,
      profile: this.state.profile
    }
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .post(`http://localhost:9000/users/signup`, data, {
        headers: headers
      })
      .then(res => {
        alert('가입되었습니다.')
        this.props.history.push("/");
      })
      .catch(e => {
        alert('회원가입실패')
      })
  }
  handleChange=(e)=>{
    const target =e.target
    const name= target.name
    this.setState({
      [name]:target.value
    })
  }
}

export default WoonSignUp
