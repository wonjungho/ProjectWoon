import React, { Component } from 'react'
import { Box, Form, FormField, Button, Heading, Image } from 'grommet'
import axios from 'axios'
import 'css/WoonSignUp.css'
import 'css/bigvideo.css'
import DefaultProfile from '../../assets/images/default-profile-icon.jpg'

class WoonSignUp extends Component {
  state = {
    userEmail: '',
    password: '',
    userName: '',
    profile: null
  }
  render () {
    let signup ={
      position: "fixed",
      color:"white",
      display: "table",
      marginLeft: "auto",
      marginRight: "auto"
    }
    let signupformwrapper={
      width: "1350px",
      height: "650px",
      border: "1px solid black"
    }
    let signupform={
      display: "table",
      margin:"auto"
    }
    let profileBtn={
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip:"rect(0,0,0,0)",
      border: "0"
    }
    let signupimgbox ={
      marginBottom:"2%"
    }
    let profilelabel ={
      marginBottom: "2%",
      display: "inline-block",
      boxSizing: "border-box",
      cursor: "pointer",
      outline: "none",
      font: "inherit",
      textDecoration: "none",
      border: "2px solid #34a8eb",
      borderRadius: "18px",
      color: "#444444",
      padding: "4px 32px",
      fontSize: "18px",
      lineHeight: "24px",
      background: "#34a8eb",
      color: "#f8f8f8",
      borderRadius: "18px",
      WebkitTransition: "0.1s ease-in-out",
      transition: "0.1s ease-in-out",
      fontWeight: "bold",
    }
    
    let buttonarea={
      marginLeft:"25%"
    }
    return (
      <div style={signup}>
        <Box width='large' background={{color:"white"}} style={signupformwrapper} round>
        <Box width='medium' style={signupform}>
          <Form onSubmit={this.signup}>
            <Heading level={2} margin='none'>
              회원가입
            </Heading>
            <FormField
              label='Email'
              name='userEmail'
              type='text'
              onChange={this.handleChange}
              required
              validate={{
                regexp: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일형식이 올바르지 않습니다.'
              }}
            />
            <FormField
              label='Password'
              name='password'
              type='password'
              required
              onChange={this.handleChange}
              validate={{
                regexp: /[A-Za-z0-9]{6,12}$/,
                message: '숫자를 포함한 6~12자리 비밀번호를 입력해주세요.'
              }}
            />
            <FormField
              label='Name'
              name='userName'
              type='text'
              required
              onChange={this.handleChange}
              validate={{
                regexp: /^[가-힝A-Za-z]{2,}$/,
                message: '이름을 입력해주세요'
              }}
            />
            <Box align='center'>
              <Box  height='small' width='small' style={signupimgbox}>
                <Image
                  fit='cover'
                  src={DefaultProfile}
                  alt='profile'
                  id='profile'
                />
              </Box>
            </Box>
            <Box align='center'>
              <label id="profilelabel" for='profileBtn' style={profilelabel}>
                프로필 등록
              </label>
            </Box>
            <FormField
              id='profileBtn'
              style={profileBtn}
              // label='Photo'
              name='profile'
              type='file'
              onChange={this.changeImg}
            />
            <Box direction='row' style={buttonarea}>
              <Button type='submit' label='SignUp' primary />
              <Button
                className='test'
                type='button'
                label='취소'
                primary
                color='#777'
              />
            </Box>
          </Form>
        </Box>
        </Box>
      </div>
    )
  }
  changeImg = e => {
    console.log(e.target.files[0])
    let fileReader = new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload = function (e) {
      document.getElementById('profile').src = e.target.result
    }
    this.setState({profile:e.target.files[0]})
  }
  signup = e => {
    e.preventDefault()

    const data = {
      userEmail: this.state.userEmail,
      password: this.state.password,
      userName: this.state.userName
      // profile: this.state.profile
    }
    let signData = new FormData()
    let profileData = this.state.profile
    
    signData.append('file', profileData)
    signData.append('emailId', data.userEmail)
    signData.append('name', data.userName)
    signData.append('pass', data.password)
    const headers = {
      'Content-Type': 'multipart/form-data',
      'processData': false
    }
    axios
      .post(`http://localhost:9000/users/signup`, signData, {
        headers: headers
      })
      .then(res => {
        alert('가입되었습니다.')
        this.props.history.push('/')
      })
      .catch(e => {
        alert('회원가입실패')
      })
  }

  handleChange = e => {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  }
}

export default WoonSignUp
