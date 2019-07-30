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
    const groupListArea = 
      
        this.state.items.map((item, idex)=>(
        <Box
        pad="large"
        align="center"
        background={{ color: "dark-2", opacity: "strong" }}
        round
        gap="small"
      >
        <Attraction size="large" />
        <Text className="test2">{item[2]}</Text>
        <Button label="Button" onClick={() => {}} />
      </Box>));
    return(
      <Box className="grouplistPagewrapper" background="white" round>
      <Box direction="row" align="end" margin={{top:"30px"}}>
            <Heading color="black">
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
      gap="medium"
      round
      wrap
    >
      {groupListArea}
    </Box>
    </Box>
        )
    }
  componentDidMount(){
    let loginId =sessionStorage.getItem('loginId')
    console.log('componentDidMount' + loginId)
    axios.get(`http://localhost:9000/groups/list/${loginId}`)
    .then(res => {
      this.setState({ items: res.data })
      console.log(this.state.items)
    })
  }
}

export default WoonGroupListPage