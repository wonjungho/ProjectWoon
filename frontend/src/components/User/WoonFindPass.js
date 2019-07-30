import React, { Component } from 'react'
import { Box, Form, FormField, Button, Heading } from 'grommet'
import tttt from '../../assets/images/main.svg'
import bigvideo from 'css/bigvideo.css'
import axios from 'axios'
import 'css/WoonFindPass.css'


class WoonFindPass extends Component {
    state = {
        finduserEmail: '',
        finduserName: '',
        findbtn:'false',
        temppass:'',
        updatepass:'',
        updatepasschk:'',
      }
    // constructor(props){
    //     super(props)
    // }

    render () {
        return (
          <Box direction="row" pad="xlarge" className="findpassword" background={{color:"white"}} round>
            <Box width='medium'id="dddd">
              <Form>
                <Heading level={2} margin='none'>
                  비밀번호 찾기
                </Heading>
                <FormField
                //   label='등록된 Email 아이디'
                  name='finduserEmail'
                  type='email'
                  onChange={this.handleChange}
                  placeholder='등록된 Email 아이디'
                  required
                />
                <FormField
                //   label='이름'
                  name='finduserName'
                  type='text'
                  required
                  onChange={this.handleChange}
                  placeholder='이름'
                  // validate={{ regexp: /^[0-9]{4,6}$/, message: '4-6 digits' }}
                />
                <Box align='center'>
                <Button
                    id='findBtn'
                  type='button'
                  label='임시비밀번호 발급받기'
                  primary
                  onClick={this.getTempPass}
                />
                {/* <img src={tttt}></img> */}
                </Box>
              </Form>
            </Box>
            <Box align="end" id="monkey">
            <img src={tttt} alt=""/>
            </Box>
          </Box>
        )
      }
      getTempPass= e =>{
        e.preventDefault()
        let data = {
          userEmail: this.state.finduserEmail,
          userName: this.state.finduserName
        }
        const headers = {
          'Content-Type': 'application/json'
        }
        axios
          .post(`http://localhost:9000/users/findpass`, JSON.stringify(data), { headers: headers })
          .then(res => {
            alert('입력하신 이메일로 임시 비밀번호가 전송되었습니다.\n해당 임시 비밀번호로 로그인 후 비밀번호 변경을 진행해주세요.')
            this.props.history.push('/')
          })
          .catch(e => {
            alert('입력하신 정보에 해당되는 아이디가 없습니다.')
          })
      }
      handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
        console.log("userEmail: "+this.state.finduserEmail)
        console.log("userName: "+this.state.finduserName)
      }
}

export default WoonFindPass