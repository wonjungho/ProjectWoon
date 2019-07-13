import React,{Component} from 'react'
import {Box,Form,FormField,Button,Heading} from 'grommet'
class WoonSignUp extends Component{
    render(){
        return(
            <Box width="large">
            <Form
              onReset={event => console.log(event)}
              onSubmit={({ value }) => console.log("Submit", value)}
            >
              <Heading level={2} margin="none">
                          회원가입
              </Heading>
              <FormField label="Email" name="userEmail" type="email" required />
              <FormField
                label="Password"
                name="password"
                type="text"
                required
                validate={{ regexp: /^[0-9]{4,6}$/, message: "4-6 digits" }}
              />
               <FormField
                label="Name"
                name="userName"
                type="text"
                required
                validate={{ regexp: /^[0-9]{4,6}$/, message: "4-6 digits" }}
              />
              <FormField
                label="Photo"
                name="photo"
                type="file"
                required
              />
                <Button type="submit" label="SignUp" primary />
            </Form>
          </Box>
        )
    }
}

export default WoonSignUp