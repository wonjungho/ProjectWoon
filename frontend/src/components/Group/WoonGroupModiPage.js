import React,{Component} from 'react'
import { createBrowserHistory } from 'history';
import {Box,Form,FormField,Button,Heading,Text, TextArea} from 'grommet'
import axios from 'axios';


class WoonGroupModiPage extends Component{

    constructor (props) {
      super(props)
      this.state = {
        open: false,
        loginUser: '',
        groupno: this.props.match.params.groupno,
        groupName: '',
        groupInfo: '',
      }
    }
    onOpen = () => this.setState({ open: true })
    onClose = () => {
      this.setState({ open: false })
      this.props.onClick()
    }
    componentDidMount () {
      let loginId = sessionStorage.getItem('loginId')
      let groupno = this.state.groupno
      console.log('DidMount groupno: ' +groupno)
        axios.get(`http://13.125.131.15/groups/${groupno}`)
        .then(res =>{
          
          this.setState({ 
            groupName: res.data.groupName,
            groupInfo: res.data.groupInfo
          })
          console.log('componentDidMount this.state.groupName : ' +this.state.groupName )
          console.log('componentDidMount this.state.groupInfo : ' +this.state.groupInfo )
        }).catch(e=>{
          alert('해당 그룹정보 가져오기 실패')
        })
      
    }
    render(){
      let modipagewrapper ={
        position:"fixed",
        background:"white",
        width: "1350px",
        height: "650px",
      }
      let modipageform={
        display:"table",
        margin:"auto"
      }
      return(
        <Box style={modipagewrapper} round>
          <Box width='large' style={modipageform}>
        
          <Heading level={3} margin='none'>
            그룹수정
          </Heading>
          <Heading level={4}>{this.state.groupName}</Heading>
            <FormField label="그룹 소개">
              <Box
                width="large"
                height="small"    
                border={{ color: "brand", size: "medium" }}
              >
              <TextArea
                size="xlarge"
                name="groupInfo"
                value={this.state.groupInfo} 
                onChange={this.handleChange}
              >
                
              </TextArea>
              
              </Box>
            </FormField>   
          <Button
            type='submit'
            label='Save'
            primary
            onClick={this.modigroup}
          />
          </Box>
        </Box>
      )
    }
    //그룹 수정
    modigroup=e=>{
      const history = createBrowserHistory()
      e.preventDefault()
      
      let data ={
        groupno: this.state.groupno,
        groupInfo: this.state.groupInfo
      }
      
      console.log('let data groupno : ' + data.groupno);
      console.log('let data groupInfo : ' + data.groupInfo);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege..'
      }
      
      axios
      .put(`http://13.125.131.15/groups/modi`, JSON.stringify(data), { headers: headers })
      .then(res =>{
        alert('그룹 내용이 수정되었습니다.')
        history.push('/grouplistpage')
        window.location.reload();
        /* this.onClose()
        window.location.reload(); */
      }).catch(e=>{
        alert('그룹 내용 수정이 실패했습니다.')
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
export default WoonGroupModiPage