import React,{Component} from 'react'
import { Box,Text,Button,Anchor, Heading } from 'grommet';
import {Attraction,AddCircle} from 'grommet-icons'
import WoonGroupInvite from './WoonGroupInvite'
import '../../assets/css/bigvideo.css'
import axios from 'axios';
class WoonGroupListPage extends Component{
  constructor(props){
    super(props)
    this.state={
      open:false,
      reload:false,
      items:[],
      groupLeader:'',
      groupno:'',
      temp:''
    }
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
      <Box className="content">
      <Box direction="row" align="end" margin={{top:"30px"}}>
            <Heading color="white">
              그룹
            </Heading>
      <Anchor icon={<AddCircle />} color="black" margin={{bottom:"30px"}} onClick={this.onOpen}/>
      {open&&(
        <WoonGroupInvite onClick={this.GroupClose}/>
      )}
      </Box>
      <Box
      direction="row"
      justify="center"
      align="center"
      pad="large"
      background={{ color: "white"}}
      border="all"
      gap="medium"
      round
      wrap
    >
     <Box
        pad="large"
        align="center"
        margin={{left:"5%",right:"5%",bottom:"5%"}}
        background={{ color: "light-2", opacity: "strong" }}
        round
        gap="small"
      >
        <Attraction size="xlarge" />
        <Text className="test2">그룹네임</Text>
        <Button label="Button" onClick={() => {}} />
      </Box>
      <Box
        pad="large"
        align="center"
        margin={{left:"5%",right:"5%",bottom:"5%"}}
        background={{ color: "dark-2", opacity: "strong" }}
        round
        gap="small"
      >
        <Attraction size="xlarge" />
        <Text className="test2">그룹네임</Text>
        <Button primary label="Button" onClick={() => {}} />
      </Box>
      <Box
        pad="large"
        align="center"
        margin={{left:"5%",right:"5%",bottom:"5%"}}
        background={{ color: "dark-2", opacity: "strong" }}
        round
        gap="small"
      >
        <Attraction size="xlarge" />
        <Text className="test2">그룹네임</Text>
        <Button label="Button" onClick={() => {}} />
      </Box>
      <Box
        pad="large"
        align="center"
        margin={{left:"5%",right:"5%",bottom:"5%"}}
        background={{ color: "dark-2", opacity: "strong" }}
        round
        gap="small"
      >
        <Attraction size="xlarge" />
        <Text className="test2">그룹네임</Text>
        <Button label="Button" onClick={() => {}} />
      </Box>
      <Box
        pad="large"
        align="center"
        margin={{left:"5%",right:"5%",bottom:"5%"}}
        background={{ color: "dark-2", opacity: "strong" }}
        round
        gap="small"
      >
        <Attraction size="xlarge" />
        <Text className="test2">그룹네임</Text>
        <Button label="Button" onClick={() => {}} />
      </Box>
      <Box
        pad="large"
        align="center"
        margin={{left:"5%",right:"5%",bottom:"5%"}}
        background={{ color: "dark-2", opacity: "strong" }}
        round
        gap="small"
      >
        <Attraction size="xlarge" />
        <Text className="test2">그룹네임</Text>
        <Button label="Button" onClick={() => {}} />
      </Box>
    </Box>
    </Box>
        )
    }
    showList=()=>{
      let loginId = sessionStorage.getItem('loginId')
      console.log(loginId)
      axios.get(`http://localhost:9000/groups/list/${loginId}`)
      .then(res=>{
        //alert('SUCCESS')
        
        this.setState({
            items: res.data,
            temp:this.props.temp            
        })
      }).catch(e=>{
        // alert('ERROR')
      }) 
    }
}

export default WoonGroupListPage