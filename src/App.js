import React from 'react';
import Timer from './components/Timer/Timer';
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { Pane, Text } from 'evergreen-ui'
import './App.css';

function App() {
  return (

      <Pane
        height='100%'
        width='100%'
        background='blueTint'
        display="flex"
        // padding={26}
        // margin={26}
        alignItems="center"
        justifyContent="center"
      >
        {/* <NavBar /> */}
        <Timer />
      </Pane>
  );
}

export default App;
