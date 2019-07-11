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
              <FormField
                label="Name"
                name="name"
                required
                validate={{ regexp: /^[a-z]/i }}
              />
              <FormField label="Email" name="email" type="email" required />
              <FormField
                label="Employee ID"
                name="employeeId"
                required
                validate={{ regexp: /^[0-9]{4,6}$/, message: "4-6 digits" }}
              />
              <FormField
                name="subscribe"
                component={CheckBox}
                pad
                label="Subscribe?"
              />
              <FormField
                name="ampm"
                component={RadioButtonGroup}
                pad
                options={["morning", "evening"]}
              />
              <FormField
                label="Size"
                name="size"
                component={Select}
                onChange={event => console.log(event)}
                options={["small", "medium", "large", "xlarge"]}
              />
              <FormField label="Comments" name="comments" component={TextArea} />
              <FormField
                label="Age"
                name="age"
                component={RangeInput}
                pad
                min={15}
                max={75}
              />
              <Box direction="row" justify="between" margin={{ top: "medium" }}>
                <Button label="Cancel" />
                <Button type="reset" label="Reset" />
                <Button type="submit" label="Update" primary />
              </Box>
            </Form>
          </Box>
        )
    }
}

export default WoonSignUp