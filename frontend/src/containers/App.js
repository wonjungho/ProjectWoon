import React,{Component} from 'react';
import {Grommet} from 'grommet'
import {grommet} from 'grommet/themes'
import WoonGrid  from '../components/WoonGrid'
import { BrowserRouter} from 'react-router-dom';   
import './test.css'

class App extends Component{
  render(){
    return(
      <BrowserRouter>
          <Grommet full theme={grommet}>
            <WoonGrid/>
          </Grommet>
      </BrowserRouter>
    );
  }
}

export default App;
