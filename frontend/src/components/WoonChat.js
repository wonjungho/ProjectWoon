import React,{Component} from 'react'
import {Box,Text,Button} from 'grommet'
import {SettingsOption} from 'grommet-icons'
class WoonChat extends Component{
    render(){
        return(
            <Box fill style={{ minWidth: "378px" }}>
          <Box
          direction="row"
          align="center"
          as="header"
          elevation="medium"
          justify="between"
        >
          <Text margin={{ left: "medium" }} className="test1">ProjectWoon</Text>
          <Text className="test2">그룹원수: 36</Text>
          <SettingsOption size ="large" color="#519D9E" />
        </Box>
        <Box flex overflow="auto" pad="xsmall" id="content">
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
          <span className="test1">body</span>
        </Box>
        <Box
          as="footer"
          border={{ side: "top" }}
          pad="small"
          justify="end"
          direction="row"
          align="center"
        >
          <Button color="#8CD790"  label="Submit" />
        </Box>
        </Box>
        )
    }
}

export default WoonChat