import React,{Component} from 'react'
import { Box,Text,Button,Anchor, Heading, DropButton } from 'grommet';
import {Attraction,AddCircle} from 'grommet-icons'
import WoonGroupInvite from './WoonGroupInvite'
import 'css/bigvideo.css'
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

  renderDropContent_1 = (groupno) => {
    return(
      <Box>
        <Anchor href='/groupmodipage'>그룹수정</Anchor>
        <Anchor onClick={this.delGroup(groupno)}>그룹삭제</Anchor>
        <Anchor>채팅방 참여</Anchor>
      </Box>
    ) 
  }
  renderDropContent_0 = (groupno) => {
    return(
      <Box>
        <Anchor>채팅방 참여</Anchor>
        <Anchor onClick={this.withdrawGroup(groupno)}>그룹 탈퇴</Anchor>
      </Box>
    ) 
  }

  //그룹 삭제
  delGroup(groupno){
    console.log('삭제 진입')
    const gn = groupno;
  
    function axiosDel(){
      console.log('axiosDel 그룹 삭제 입장')
      console.log('groupno: '+gn)
      axios.delete(`http://localhost:9000/groups/delete/${gn}`)
    }
    return axiosDel; 
  }
  //그룹 탈퇴
  withdrawGroup(groupno){
    console.log('탈퇴 진입')
    const loginId = sessionStorage.getItem('loginId')
    const gn = groupno; 
    function axioWithdraw(){
      console.log('axioWithdraw 입장')
      console.log('loginId: '+loginId)
      console.log('groupno: '+gn)
      axios.delete(`http://localhost:9000/groups/delete/${loginId}/${gn}`)
    }
    return axioWithdraw;
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
        {/* <Button label="Button" onClick={() => {}} /> */}
        <DropButton
          label="Button"
          alignSelf='center'
          margin={{ vertical: 'small' }}
          dropContent={item[3]==='1'?this.renderDropContent_1(item[0]):this.renderDropContent_0(item[0])}
          dropProps={{ align: { top: 'bottom' } }}
        >
                  
                </DropButton>
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