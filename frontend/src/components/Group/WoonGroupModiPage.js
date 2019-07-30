import React,{Component} from 'react'
import {Box,Form,FormField,Button,Heading,Text, TextArea} from 'grommet'
import axios from 'axios';


class WoonGroupModiPage extends Component{

    constructor (props) {
      super(props)
      this.state = {
        open: false,
        loginUser: '',
        groupName: '',
        groupInfo: '',
      }
    }
    componentDidMount () {
      let loginId = sessionStorage.getItem('loginId')
      let groupno = this.props.match.params.groupno
      console.log('DidMount groupno: ' +groupno)
        axios.get(`http://localhost:9000/groups/${groupno}`)
        .then(res =>{
          
          this.setState({
            groupName: res.data.groupName,
            groupInfo: res.data.groupInfo
          })
        }).catch(e=>{
          alert('해당 그룹정보 가져오기 실패')
        })
      
    }
    render(){
        
        return(
            <Box width='large'>
          <Form>
            <Heading level={2} margin='none'>
              그룹수정
            </Heading>
            <h1>{this.state.groupName}</h1>
              <FormField label="GroupInfo">
                <Box
                width="large"
                height="small"    
                // border={{ color: "brand", size: "medium" }}
                >
                <TextArea
                size="xlarge"
                name="groupInfo"
                
                >
                 {this.state.groupInfo} 
                </TextArea>
                </Box>
              </FormField>   
            <Button
              type='submit'
              label='Save'
              primary
              //onClick={this.modigroup()}
            />
          </Form>
        </Box>
        )
    }
    //그룹 수정
    modigroup(){
      alert('modigroup')
      let data ={
        groupno: this.state.groupno,
        groupInfo: ''
      }
      let headers = {
        'Content-Type': 'application/json',
        Authorization: 'JWT fefege..'
      }
      
      /* axios
        .put(`http://localhost:9000/groups/modi`, JSON.stringify(data), { headers: headers })
        .then(res =>{
          alert('그룹 내용이 수정되었습니다.')
          
        }).catch(e=>{
          //alert('ERROR')
        }) */
    
      }
    
}
export default WoonGroupModiPage