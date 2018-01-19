/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  Icon,
  Text,
  Fab
} from "native-base";

import { LinearGradient } from 'expo';

export default class MainContainer extends Component {

  constructor(props)
  {
    super(props)

    this.state = { homeActive: true, chatActive: false, agendaActive: false, profileActive: false }
  }

  _changeState( resp )
  {

    if( resp === 1)
    {
      this.setState( previousState => {
        previousState.homeActive = true
        previousState.chatActive = false
        previousState.agendaActive = false
        previousState.profileActive = false
        return previousState
      })
    }
    else if( resp === 2)
    {
      this.setState( previousState => {
        previousState.homeActive = false
        previousState.chatActive = true
        previousState.agendaActive = false
        previousState.profileActive = false
        return previousState
      })
    }
    else if( resp === 3)
    {
      this.setState( previousState => {
        previousState.homeActive = false
        previousState.chatActive = false
        previousState.agendaActive = true
        previousState.profileActive = false
        return previousState
      })
    }
    else
    {
      this.setState( previousState => {
        previousState.homeActive = false
        previousState.chatActive = false
        previousState.agendaActive = false
        previousState.profileActive = true
        return previousState
      })
    }
  }


  render() {
    return (
      <Container style={styles.container}>
          <LinearGradient
            colors={['#fd7292', '#fd6342']}
            style={styles.gradientHeader}
          >
            <Header style={{ backgroundColor: 'transparent' }}>
              <Left>
              </Left>
              <Body>
                <Title style={{ color: 'white' }}>Inicio</Title>
              </Body>
              <Right />
            </Header>
          </LinearGradient>


        <Content>
          <Text> Hola </Text>
        </Content>

        <Footer style={{ backgroundColor: 'white' }}>
          <FooterTab style={{ backgroundColor: 'white' }} >

            <Button transparent onPress={() => this._changeState(1) }>
              <Image  style={ styles.tabIcon } source={ this.state.homeActive ? require('./img/Homeactiv.png') : require('./img/Home.png')} />         
            </Button>

            <Button transparent onPress={() => this._changeState(2) }>
              <Image  style={ styles.tabIcon } source={ this.state.chatActive ? require('./img/Chatactiv.png') : require('./img/Chat.png')} />  
            </Button>

            <View style={{ flex: 0.8, height: '100%' }} >
              <Fab
                active={ true }
                direction="up"
                containerStyle={{ }}
                style={ styles.fabIcon }
                onPress={() => console.log("hola") }>
                <Icon name="add" />
              </Fab>
            </View>


            <Button transparent onPress={() => this._changeState(3) }>
              <Image  style={ styles.tabIcon } source={ this.state.agendaActive ? require('./img/agendactiv.png') : require('./img/agenda.png')} />
            </Button>

            <Button transparent onPress={() => this._changeState(4) }>
              <Image  style={ styles.tabIcon } source={ this.state.profileActive ? require('./img/Profileactiv.png') : require('./img/Profile.png')} />
            </Button>

          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: 
  {
    backgroundColor: "#FFF"
  },
  text: 
  {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: 
  {
    marginBottom: 15
  },
  gradientHeader: 
  {
  },
  tabIcon:
  { 
    resizeMode: 'contain', 
    height: '95%', 
    width: '95%' 
  },
  fabIcon:
  { 
    ...Platform.select({
      ios: 
      {
        backgroundColor: '#fd6656', 
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        marginLeft: 49,
        top: 9,
        elevation: 8
      },
      android:
      {
        backgroundColor: '#fd6656', 
        position: 'relative',
        flex: 0.95,
        justifyContent: 'center',
        marginLeft: 45,
        top: 21,
        elevation: 8,
        width: '95%'
      }
    })
  }
});
