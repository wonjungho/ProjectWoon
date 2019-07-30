import React,{Component} from 'react'
import {Grid} from 'grommet'
import WoonHeader from './WoonHeader'
import WoonSideBar from './WoonSideBar'
import WoonMain from './WoonMain'

class WoonGrid extends Component{
    static count =1;
    constructor(props){
      super(props)
      this.state={
        sidebar:true,temp:''
      }
    }
    fn=()=>{
      console.log('aaaa')
      this.setState({
        temp:""+WoonGrid.count++
      })
      console.log(this.state.temp)
    }
    render(){
        return(
            <Grid
            fill
            rows={["auto", "flex"]}
            columns={["auto", "flex"]}
            areas={[
              { name: "header", start: [0, 0], end: [1, 0] },
              { name: "sidebar", start: [0, 1], end: [0, 1] },
              { name: "main", start: [1, 1], end: [1, 1] }
            ]}
          >
            <WoonHeader fn={this.fn}/>
            <WoonMain/>
        </Grid>
        )

    }
}
export default WoonGrid