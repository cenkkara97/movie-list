import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import Main from '../Main';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends Component {
      render() {
        return (
          <div className="App">
              <AppBar position="static" >
                  <Toolbar >
                      <Typography variant="title" style={{flex:1,color:"#fff",fontSize:"25px",textAlign:"left"}}>
                          Batman TV Shows
                      </Typography>
                  </Toolbar>
              </AppBar>
              <Main />

          </div>
        );
      }
}

export default App;
