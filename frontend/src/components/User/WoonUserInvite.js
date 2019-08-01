import React,{Component} from 'react'
import {Box,Layer,Heading,Button,FormField,TextInput} from 'grommet'
import {Close} from 'grommet-icons'
import axios from 'axios';

class WoonUserInvite extends Component{
    state={
        useropen:false,
        userEmail:''
    }
    constructor(props){
        super(props)
    }
    onUserClose=()=>{
        this.props.onClick()
    }
    render(){
        return(
            <Layer
                position="center"
                height="Large"
                modal
                onClickOutside={this.onUserClose}
                onEsc={this.onUserClose}
              >
                <Box
                  as="form"
                  fill="vertical"
                  overflow="auto"
                  width="medium"
                  height="small"
                  pad="medium"
                  onSubmit={this.userInvite}
                >
                  <Box flex={false} direction="row" justify="between">
                    <Heading level={2} margin="none">
                      유저초대
                    </Heading>
                  <Button icon={<Close/>} onClick={this.onUserClose}/>
                  </Box>
                  <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                  <FormField label="userEmail">
                  <TextInput name="userEmail" onChange={this.handleChange}/>
                  </FormField>
                  </Box>
                  <Box flex={false} as="footer" align="center">
                  <Button
                  type="submit"
                  label="초대하기"
                  primary
                  />
                  </Box>
                  </Box>
                </Layer>
        )
    }
    userInvite=()=>{
      let email=this.state.userEmail
      axios.get(`http://13.125.131.15/groups/inviteUser/${email}`)
      .then(res=>{
        alert('정상적으로 이메일이 전송되었습니다.')
      })
      .catch(e=>{
        console.log(e)
      })
    }
    handleChange= e =>{
      const target =e.target
      const name =target.name
      this.setState({
        [name]:target.value
      })
    }
}
export default WoonUserInvite