import React,{Component} from 'react';
import {Grid,Box} from 'grommet'

class App extends Component{
  render(){
    return(
      <Grid
      areas={[
        { name: "nav", start: [0, 0], end: [0, 1] },
        { name: "main", start: [1, 0], end: [2, 1] },
        { name: "side2",start:[0,1],end:[1,1]},
        { name: "main2",start:[0,1],end:[2,1]},

      ]}
      columns={["small", "flex", "medium"]}
      rows={["medium", "small"]}
      gap="small"
    >
      <Box gridArea="nav" background="brand" />
      <Box gridArea="main" background="coral" />
      <Box gridArea="main2" background="yellow" />
      <Box gridArea="side2" background="gray" />
    </Grid>

    )
  }
}

export default App;
