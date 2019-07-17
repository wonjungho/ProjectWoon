import React,{Component} from 'react'
import {Box,Heading,Button,FormField,TextInput} from 'grommet'

class WoonChatSignup extends Component{
    constructor(props){
        super(props);
        this.state ={  
            username:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        this.setState({username:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault()
        this.props.onSubmit(this.state.username)
    }
    render(){
        return(
                <Box
                  as="form"
                  fill="vertical"
                  overflow="auto"
                  width="large" 
                  height="small"
                  pad="medium"
                  onSubmit={this.handleSubmit}
                >
                  <Box flex={false} direction="row" justify="between">
                    <Heading level={2} margin="none">
                        Let's Talk
                    </Heading>
                  </Box>
                  <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                  <FormField label="What is your email?">
                  <TextInput name="username"  onChange={this.handleChange}/>
                  </FormField>
                  </Box>
                  <Box flex={false} as="footer" align="center">
                  <Button
                  type="submit"
                  label="생성"
                  primary
                  />
                  </Box>
                  </Box> 
        )
    }
}
export default WoonChatSignup