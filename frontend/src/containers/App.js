import React,{Component} from 'react';
import {Grommet} from 'grommet'
import {grommet} from 'grommet/themes'
import WoonGrid  from '../components/WoonGrid'
import './test.css'

class App extends Component{
  render(){
    return(
         <Grommet full theme={grommet}>
        <WoonGrid>
        </WoonGrid>
      </Grommet>
    );
  }
}

export default App;
