import React,{Component} from 'react';
import {Grommet} from 'grommet'
import {grommet} from 'grommet/themes'
import WoonGrid  from '../components/WoonGrid'
import { BrowserRouter, Route } from 'react-router-dom';
import {GoToRoomInput} from '../components/GoToRoomInput'
import Video from '../components/Video'
import './test.css'

class App extends Component{
  render(){
    return(
      <BrowserRouter>
         <Grommet full theme={grommet}>
        {/* <WoonGrid/> */}
        <Route path="/" exact component={GoToRoomInput}/>
        <Route path="/:roomId" exact component={Video}/>
      </Grommet>
      </BrowserRouter>
    );
  }
}

export default App;
