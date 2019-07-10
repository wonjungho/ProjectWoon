import React,{Component} from 'react'
import {Box,Text,Button} from 'grommet'

class WoonGroupList extends Component{
    render(){
        return(
            <Box margin={{ bottom:"50%" }}>
                  {["삼성", "엘지", "에스케이"].map(name => (
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
export default WoonGroupList