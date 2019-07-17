import React,{Component} from 'react'
import {Box,Text,Anchor,Layer,Heading,Button,FormField,TextInput,TextArea} from 'grommet'
import {AddCircle,Close} from 'grommet-icons'

class WoonUser extends Component{
      constructor(){
        super()
        this.state={useropen:false}
      }
      onOpen=()=>this.setState({useropen:true})
      onClose=()=>this.setState({useropen:false})
      GroupClose=()=>{
        this.setState({
            useropen:!this.state.open
        })
      }
    render(){
        return(
            <Box margin={{ top:"50%" }}>
                   <Box margin={{ bottom:"50%" }}>
              <Box pad={{ horizontal: "medium", vertical: "small" }} direction="row">
              <Text className="test" margin={{top:"12px",right:"60px"}} >User </Text>
              <Anchor icon={<AddCircle />} color="white" onClick={this.onOpen}/>
              {/* {useropen&&(
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
                      유저초대
                    </Heading>
                  <Button icon={<Close/>} onClick={this.onClose}/>
                  </Box>
                  <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                  <FormField label="userEmail">
                  <TextInput name="userEmail"/>
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
                )} */}
              </Box>    
            </Box>
                  </Box>
        )
    }
}
export default WoonUser