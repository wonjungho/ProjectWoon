import React,{Component} from 'react'
import {Box,Button,Text} from 'grommet'
class WoonHeader extends Component{
    state={sidebar:true}
    render(){
        const{sidebar} =this.state
        return(
            <Box
                gridArea="header"
                direction="row"
                align="center"
                justify="between"
                pad={{ horizontal: "medium", vertical: "small" }}
                background="#285943"
              >
                <Button onClick={() => this.setState({ sidebar: !sidebar })}>
                  <Text size="large" className="test">Woon</Text>
                </Button>
                <Text className="test">원정호님</Text>
              </Box>
        )
    }
    
}

export default WoonHeader