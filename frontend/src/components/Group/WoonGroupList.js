import React,{Component} from 'react'
import {Box,Anchor,Text, DropButton} from 'grommet'
import {AddCircle, CircleInformation} from 'grommet-icons'
import WoonGroupInvite from './WoonGroupInvite'
import axios from 'axios';


class WoonGroupList extends Component{
    state={
      open:false,
      reload:false,
      items:[],
      groupLeader:'',
      groupno:''
    }
    constructor(props){
      super(props)
      this.onOpen=this.onOpen.bind(this)    
      this.onClose=this.onClose.bind(this)
    }
    onOpen=()=>this.setState({open:true})
    onClose=()=>this.setState({open:false})
    GroupClose=()=>{
      this.setState({
        open:!this.state.open
      })
    }
    renderDropContent_1() {
      return(
        <Box>
          <Anchor>그룹수정</Anchor>
          <Anchor>그룹삭제</Anchor>
          <Anchor>채팅방 참여</Anchor>
        </Box>
      ) 
    }
    renderDropContent_0() {
      return(
        <Box>
          <Anchor>채팅방 참여</Anchor>
          <Anchor>나가기</Anchor>
        </Box>
      ) 
    }
    //처음 페이지 로드 후 
    checkGroupLeader(groupno){
      //alert('groupno : '+ groupno)
      const gn = groupno;
      const id = sessionStorage.getItem('loginId')
      
      function axioschk(){
        //alert(gn);
        axios.get(`http://localhost:9000/groups/chkLeader/${id}/${gn}`)
        .then(res =>{
          console.log('그룹리더체크성공')
          console.log(res.data)
          this.setState({
            groupLeader:""+res.data
          })
          alert(this.state.groupLeader)
          //console.log('chkLeader :' + res.data)
          //this.setState({
          //  groupLeader: res.data })
        }).catch(e => {
          //alert('그룹리더체크실패')
        })
        
      }
      return axioschk;
    }
    //reload=()=>this.setState({check:!this.state.check})
    render(){
      const temp = sessionStorage.getItem('loginId')
      const{open} =this.state
      const groupListArea =
        temp == null ? (
            <Box direction="row">
              <Text>가입한 그룹 없음</Text>
            </Box>
          ) : (
            this.state.items.map((item, index)=>(
              <Box key={index} direction="row">
                <Text className="test">{item.groupName}</Text>
                
                <DropButton
                  alignSelf='center'
                  margin={{ vertical: 'small' }}
                  dropContent={this.state.groupLeader==='1'?this.renderDropContent_1():this.renderDropContent_0()}
                  dropProps={{ align: { top: 'bottom' } }}
                  onClick={this.checkGroupLeader(item.groupno)}
                >
                  <Anchor
                    icon={<CircleInformation />} color="white"
                    //background='url(//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80)'
                    // texture="url(//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80)"
                  />
                </DropButton>
              </Box>
            ))
          )
        return(
            <Box margin={{ bottom:"50%" }}>
              <Box pad={{ horizontal: "medium", vertical: "small" }} direction="row">
              <Text className="test" margin={{top:"12px",right:"60px"}} >Group </Text>
              <Anchor icon={<AddCircle />} color="white" onClick={this.onOpen}/>
              {open&&(
                <WoonGroupInvite onClick={this.GroupClose}/>
              )}
              </Box>
              {groupListArea}
                    
            </Box>
        )
    }
    check = () => {
      // alert('check')
      this.setState({ reload: !this.state.reload })
    }
    componentDidMount(){
      this.showList();
    }
    showList=()=>{
      let loginId = sessionStorage.getItem('loginId')
      console.log(loginId)
      axios.get(`http://localhost:9000/groups/list/${loginId}`)
      .then(res=>{
        //alert('SUCCESS')
        this.setState({
            items: res.data            
        })
        console.log(this.state.items[0])
        
      }).catch(e=>{
        // alert('ERROR')
      })
      
    }
    
}
export default WoonGroupList