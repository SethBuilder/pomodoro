import React from 'react';
import Timer from './components/Timer/Timer';
import { Pane } from 'evergreen-ui'
import './App.css';
import NavBar from './components/NavBar/NavBar';
function App() {
  return (
    <Pane
      height='100%'
      width='100%'
      background='#BCD0E7'
      display="flex"
      // padding={26}
      // margin={26}
      alignItems="center"
      justifyContent="center"
    >
      <NavBar />
      <Timer />
    </Pane>
  );
}

export default App;
