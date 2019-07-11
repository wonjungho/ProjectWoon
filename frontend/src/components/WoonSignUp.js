import React,{Component} from 'react'
import {Box,Form,FormField,Button,CheckBox,RadioButtonGroup,Select,TextArea,RangeInput} from 'grommet'
class WoonSignUp extends Component{
    render(){
        return(
            <Box width="medium">
            <Form
              onReset={event => console.log(event)}
              onSubmit={({ value }) => console.log("Submit", value)}
            >
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
                validate={{ regexp: /^[0-9]{4,6}$/, message: "4-6 digits" }}
              />
              <Box direction="row" justify="between" margin={{ top: "medium" }}>
                <Button type="submit" label="Update" primary />
                <Button type="reset" label="Reset" />
              </Box>
            </Form>
          </Box>
        )
    }
}

export default WoonSignUp