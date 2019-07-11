import React,{Component} from 'react'
import {Layer,Box,Heading,Button,Anchor,FormField,TextInput} from 'grommet'
import { Close } from 'grommet-icons';
class WoonLogin extends Component{
  state={sidebar:true,open:false,select:""}
  constructor(props){
    super(props)
  }
    onOpen=()=>this.setState({open:true})
    onClose=()=>{
      this.setState({open:false})
      this.props.onClick();
    }
    render(){
        return(
            <Layer
                    position="center"
                    height="medium"
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
                          로그인
                        </Heading>
                  <Button icon={<Close/>} onClick={this.onClose}/>
                      </Box>
                      <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                  <FormField label="Email">
                    <TextInput/>
                  </FormField>
                  <FormField label="password">
                    <TextInput type="password"/>
                  </FormField>
                  </Box>
                  <Box flex={false} as="footer" align="center">
                    <Button
                      type="submit"
                      label="로그인"
                      onClick={this.onClose}
                      primary
                    />
                  </Box>
                  <Box flex={false} as="footer" align="center">
                  <Anchor href="#">SignUp</Anchor>/<Anchor>FindMyInfo</Anchor>
                  </Box>
                    </Box>
                  </Layer>
        )
    }
}

export default WoonLogin