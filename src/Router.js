import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Welcome from './components/Login/Welcome';
import ForgotPassword from './components/Login/ForgotPassword';

const RouterComponent = () => {
    return (
      <Router hideNavBar="true">
        <Scene key="root" hideNavBar="true">
          <Scene key="Welcome" component={Welcome} title="Welcome" />
          <Scene key="ForgotPassword" component={ForgotPassword} title="ForgotPassword" />
        </Scene>
      </Router>
    );
  };

export default RouterComponent;
