import React,{Component} from 'react'
import {Box,Form,FormField,Button,Heading,Text, TextArea} from 'grommet'
import Axios from 'axios';

class WoonGroupModiPage extends Component{
    constructor (props) {
      super(props)
      this.state = {
        open: false,
        loginUser: '',
      }
    }
    componentDidMount () {
      console.log('componentDidMount')
      let loginId = sessionStorage.getItem('loginId')
      /* Axios.get(`http://localhost:9000/group/${loginId}/${groupno}`)
      .then(res =>{

      }) */
    }
    render(){
        return(
            <Box width='large'>
          <Form>
            <Heading level={2} margin='none'>
              그룹수정
            </Heading>
            <h1>이곳에는 그룹명이 들어갈것입니다!</h1>
            <FormField label="GroupInfo">
              <Box
              width="large"
              height="small"    
              // border={{ color: "brand", size: "medium" }}
              >
              <TextArea
               size="xlarge"
               name="groupInfo"
               fill
              />
              </Box>
              </FormField>   
            <Button
              type='submit'
              label='SignUp'
              primary
            />
          </Form>
        </Box>
        )
    }
}
export default WoonGroupModiPage