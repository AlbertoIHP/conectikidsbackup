import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Welcome from '../components/Login/Welcome'
import ForgotPassword from '../components/Login/ForgotPassword'
import MainContainer from '../components/MainContainer'
import AddTask from '../components/AgendaHome/AddTask'
import AddActivity from '../components/Menu/AddActivity'
import ChangeUser from '../components/ProfileHome/ChangeUser'


const RouterComponent = () => {
    return (
      <Router hideNavBar="true">
        <Scene key="root" hideNavBar="true">
          <Scene key="MainContainer" component={MainContainer} title="MainContainer"/>
          <Scene key="Welcome" component={Welcome} title="Welcome"  initial={true}/>
          <Scene key="ForgotPassword" component={ForgotPassword} title="ForgotPassword" />
          <Scene key="AddActivity" component={AddActivity} title="AddActivity" />
          <Scene key="AddTask" component={AddTask} title="AddTask" />
          <Scene key="ChangeUser" component={ChangeUser} title="ChangeUser" />
        </Scene>
      </Router>
    );
  };

export default RouterComponent;
