/* @flow */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions
} from 'react-native'

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
  Fab,
  Drawer,
  List,
  Badge,
  ListItem,
  Grid,
  Row,
  Column
} from "native-base"

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

import { LinearGradient } from 'expo'

import AgendaHome  from '../AgendaHome'

import FeedHome from '../FeedHome'

import ProfileHome from '../ProfileHome'

import ChatHome from '../ChatHome'

import Menu from './Menu'

import { Actions } from 'react-native-router-flux'

const drawerCover = require("./img/BackgroundLogin.png")

const drawerImage = require("./img/logoname.png")



 //HARDCODEADO ESTA MATRIZ DEBE GENERARSE HACIENDO EL FETCH AL ENDPOINT QUE ENTREGA LOS CURSOS A PARTIR DE LA ID DEL PROFE
const datas = [
  {
    name: "Curso 1",
    courseId: "123",
    icon: "ios-people-outline"
  },
  {
    name: "Curso 2",
    courseId: "345",
    icon: "ios-people-outline"
  },
  {
    name: "Curso 3",
    courseId: "567",
    icon: "ios-people-outline"
  }

]



export default class MainContainer extends Component {

  constructor(props)
  {
    super(props)

    this.state = { 
      homeActive: true, 
      chatActive: false, 
      agendaActive: false, 
      profileActive: false,
      menuActive: false,
      shadowOffsetWidth: 1,
      shadowRadius: 4 
    }
  }



  _renderDrawerContent()
  {
    return (
      <Container>
        <Content bounces={false} style={ styles.drawContainerStyle }>
          <Grid>
            <Row >
              <Image source={ drawerCover} style={ styles.drawerCoverStyle } />
              <Image style={ styles.logoNameStyle } source={ drawerImage } />
            </Row>
            <Row>            
              <Text> Mis Cursos </Text>
            </Row>

            <Row>
              <List dataArray={datas} renderRow={data => 
                <ListItem button noBorder onPress={() => console.log("Hay que cambiar al curso con ID "+data.courseId)}>
                    <Left>
                      <Icon active name={data.icon} style={ styles.IconStyle } />
                      <Text style={styles.text}>
                        {data.name}
                      </Text>
                    </Left>
                </ListItem>}/>
            </Row>

          </Grid>
        </Content>
      </Container>
      )
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
        previousState.menuActive = false
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
        previousState.menuActive = false
        return previousState
      })
    }
    else if( resp === 4)
    {
      this.setState( previousState => {
        previousState.homeActive = false
        previousState.chatActive = false
        previousState.agendaActive = false
        previousState.profileActive = true
        previousState.menuActive = false
        return previousState
      })
    }
    else
    {
      this.setState( previousState => {
        previousState.homeActive = false
        previousState.chatActive = false
        previousState.agendaActive = false
        previousState.profileActive = false
        previousState.menuActive = true
        return previousState
      })      
    }
  }

  closeDrawer()
  {
    this.drawer._root.close()
  }
  
  openDrawer()
  {
    this.drawer._root.open()
  }

  _renderAddTaskButon()
  {
    return (
      <Right>
        <Button transparent onPress={() => Actions.AddTask() }>
          <Icon style= {{ color: "white" }} name="ios-add-outline" />
        </Button>
      </Right>
      )
  }


  render() 
  {


    return (
      <Drawer
        ref={(ref) => { this.drawer = ref }}
        content={ this._renderDrawerContent() }
        onClose={() => this.closeDrawer()} >

        <Container style={styles.container}>
            <LinearGradient colors={['#fd7292', '#fd6342']} style={styles.gradientHeader} >
              <Header style={{ backgroundColor: 'transparent' }}>

                <Left>
                  <Button transparent onPress={() => this.openDrawer() } >
                    <Icon style= {{ color: "white" }} name="menu" />
                  </Button>
                </Left>

                <Body>
                  <Title style={{ color: 'white' }}>Inicio</Title>
                </Body>


                { this.state.agendaActive ? this._renderAddTaskButon() : <Right /> }                

              </Header>
            </LinearGradient>


          <Content>
            { this.state.homeActive ? <FeedHome /> : null }

            { this.state.chatActive ? <ChatHome /> : null }

            { this.state.profileActive ? <ProfileHome />: null }

            { this.state.agendaActive ? <AgendaHome />: null }

            { this.state.menuActive ? <Menu />: null }
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
                  onPress={() => this._changeState(5) }>
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
      </Drawer>




    )
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
        marginLeft: 30,
        top: 21,
        elevation: 8,
        width: '95%'
      }
    })
  },
  text: 
  {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: 
  {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  badgeStyle:
  { 
    borderRadius: 3, 
    height: 25, 
    width: 72
  },
  IconStyle: 
  { 
    color: "#fd6b71", 
    fontSize: 26, 
    width: 30 
  },
  drawContainerStyle:
  { 
    flex: 1, 
    backgroundColor: "#fff", 
    top: -1 
  },
  logoNameStyle:
  { 
    marginTop: 6, 
    flex: 1, 
    justifyContent: 'center', 
    alignContent: 'center', 
    width: 150, 
    height: 140, 
    resizeMode: 'contain' 
  },
  drawerCoverStyle:
  { 
    position: 'absolute', 
    width: '100%', 
    height: '100%' 
  }
})
