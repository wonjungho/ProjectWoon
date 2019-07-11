import React,{Component} from 'react'
import {Box,Anchor,Text, TextArea,Layer,Heading,Button,FormField,TextInput} from 'grommet'
import {AddCircle,Close} from 'grommet-icons'

class WoonGroupList extends Component{
    state={open:false}
    constructor(props){
      super(props)
      this.onOpen=this.onOpen.bind(this)
      this.onClose=this.onClose.bind(this)
    }
    onOpen=()=>this.setState({open:true})
    onClose=()=>this.setState({open:false})
    GroupClose=()=>{
      this.setState({
        open:!this.state.open
      })
    }
    render(){
      const{open} =this.state
        return(
            <Box margin={{ bottom:"50%" }}>
              <Box pad={{ horizontal: "medium", vertical: "small" }} direction="row">
              <Text className="test" margin={{top:"12px",right:"60px"}} >Group </Text>
              <Anchor icon={<AddCircle />} color="white" onClick={this.onOpen}/>
              {open&&(
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
                  <TextInput/>
                  </FormField>
                  <FormField label="GroupInfo">
                  <Box
                  width="large"
                  height="small"
                  // border={{ color: "brand", size: "medium" }}
                  >
                  <TextArea
                   size="xlarge"
                   fill
                  />
                  </Box>
                  </FormField>
                  </Box>
                  <Box flex={false} as="footer" align="center">
                  <Button
                  type="submit"
                  label="생성"
                  onClick={this.onClose}
                  primary
                  />
                  </Box>
                  </Box>
                </Layer>
              )}
              </Box>    
            </Box>
        )
    }
}
export default WoonGroupList