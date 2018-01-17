import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import  Welcome  from './components/Login/Welcome';

const RouterComponent = () => {
    return(
      <Router hideNavBar="true">
        <Scene key="root" hideNavBar="true">
          <Scene key="Welcome" component={Welcome} title="Welcome"  />
        </Scene>
      </Router>
    );
  };

export default RouterComponent;
