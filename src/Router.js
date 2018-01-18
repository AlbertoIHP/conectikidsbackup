import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Welcome from './components/Login/Welcome';
import ForgotPassword from './components/Login/ForgotPassword';
import Home from './components/Home';

const RouterComponent = () => {
    return (
      <Router hideNavBar="true">
        <Scene key="root" hideNavBar="true">
          <Scene key="Welcome" component={Welcome} title="Welcome" />
          <Scene key="ForgotPassword" component={ForgotPassword} title="ForgotPassword" />
          <Scene key="Home" component={Home} title="Home" />
        </Scene>
      </Router>
    );
  };

export default RouterComponent;
