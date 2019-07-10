import React,{Component} from 'react'
import {Box,Text,Button} from 'grommet'

class WoonUser extends Component{
    render(){
        return(
            <Box margin={{ top:"50%" }}>
                  {["강감찬", "유관순", "권율"].map(name => (
                    <Button key={name} href="#" hoverIndicator>
                      <Box pad={{ horizontal: "medium", vertical: "small" }}>
                        <Text color="white" className="test">{name}</Text>
                      </Box>
                    </Button>
                  ))}
                  </Box>
        )
    }
}
export default WoonUser