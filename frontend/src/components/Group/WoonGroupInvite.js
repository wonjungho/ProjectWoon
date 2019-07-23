import React,{Component} from 'react'
import {Box,Layer,Heading,TextArea,TextInput,Button,FormField} from 'grommet'
import {Close} from 'grommet-icons'
import axios from 'axios';

class WoonGroupInvite extends Component{
    state={open:false,
        groupName:'',
        groupInfo:''
      }

    onClose=()=>{
        this.props.onClick()
    }
    render(){
        return(
            <Layer
            position="center"
            height="Large"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Box
              as="form"
              fill="vertical"
              overflow="auto"
              width="medium"
              height="small"
              pad="medium"
              onSubmit={this.onClose}
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level={2} margin="none">
                  그룹생성
                </Heading>
              <Button icon={<Close/>} onClick={this.onClose}/>
              </Box>
              <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
              <FormField label="GroupName">
              <TextInput name="groupName" value={this.state.groupName} onChange={this.handleChange}/>
              </FormField>
              <FormField label="GroupInfo">
              <Box
              width="large"
              height="small"
              // border={{ color: "brand", size: "medium" }}
              >
              <TextArea
               size="xlarge"
               name="groupInfo"
               value={this.state.groupInfo}
               onChange={this.handleChange}
               fill
              />
              </Box>
              </FormField>
              </Box>
              <Box flex={false} as="footer" align="center">
              <Button
              type="submit"
              label="생성"
              onClick={this.createGroup}
              primary
              />
              </Box>
              </Box>
            </Layer>
        )
    }
    createGroup =(e)=>{
        let loginId = sessionStorage.getItem('loginId')
        console.log(loginId)
        e.preventDefault();
        let data ={
          groupName:this.state.groupName,
          groupInfo:this.state.groupInfo
          
        }
        let header={
          'Content-Type':'application/json',
          'Authorization':'JWT fefege..'
        }
        
        axios.post(`http://localhost:9000/groups/${loginId}`,data,{headers:header})
        .then(res=>{
          alert(res.data.result);
          this.setState({
            open:false,
            groupName: '',
            groupInfo: ''
          })
        })
        .catch(e=>{
          alert('실패');
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

export default WoonGroupInvite