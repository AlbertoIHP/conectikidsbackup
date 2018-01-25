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
import { storage } from '../../services/localStorage.service'
import { courseService } from '../../services/Course.service'

import { LinearGradient } from 'expo'

import AgendaHome  from '../AgendaHome'

import FeedHome from '../FeedHome'

import ProfileHome from '../ProfileHome'

import ChatHome from '../ChatHome'

import Menu from '../Menu'

import { Actions } from 'react-native-router-flux'

const drawerCover = require("./img/BackgroundLogin.png")

const drawerImage = require("./img/logoname.png")

import EventEmitter from "react-native-eventemitter"



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
      shadowRadius: 4,
      user: {},
      token: '',
      datas: [],
      selectedCourse: ''
    }
  }


  async componentDidMount()
  {
    let token =  await storage.getItem( 'token' )
    let user =  await storage.getItem( 'currentUser' )

    if( user.role === 'teacher' )
    {
      courseService.getCoursesByProfessorId( user.id, token ).then( ( response ) => {
        this.setState( (previousState) => {
          previousState.token = token
          previousState.user = user
          previousState.datas = response.data.teacherCourses


          //TOMAMOS POR DEFECTO EL PRIMER CURSO DEL PROFESOR, Y EMITIMOS EL EVENTO CON SU ID
          //ENTONCES, EL FEED Y LA AGENDA DESATARAN EL EVENTO DE OBTENER LAS ACTIVIDADES Y TAREAS
          //RESPECTIVAMENTE, SIEMPRE DEPENDIENDO DE LA ID, ENTONCES, CUANDO SE CAMBIE DE ID, SE EMITIRA
          //NUEVAMENTE ESTE EVENTO, DE MANERA QUE, TODO SU CONETENIDO, SERA RECARGADO

          this.changeCourseId( previousState.datas[0].id, previousState.token )        
        
          return previousState
        })      
      } ).catch( ( error ) => {
        console.log( error )
      })      
    }
    else if( user.role === 'parent')
    {
      console.log("AQUI SE DEBE DE CREAR UN ENDPOINT PARA FILTRAR POR LOS NIÑOS DE UN PADRE")
    }

    




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
        previousState.menuActive = false
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
        <Button transparent onPress={() => Actions.AddTask({text: {user: this.state.user, token: this.state.token, selectedCourse: this.state.selectedCourse } }) }>
          <Icon style= {{ color: "white" }} name="ios-add-outline" />
        </Button>
      </Right>
      )
  }
  _renderChangeProfile()
  {
    return (
      <Right>
        <Button transparent onPress={() => Actions.ChangeUser({text: {user: this.state.user, token: this.state.token, selectedCourse: this.state.selectedCourse } }) }>
          <Icon style= {{ color: "white" }} name="settings" />
        </Button>
      </Right>
      )
  }

  _renderAddChatButton()
  {
    return (
      <Right>
        <Button transparent onPress={() => Actions.AddChat({text: {user: this.state.user, token: this.state.token, selectedCourse: this.state.selectedCourse } }) }>
          <Icon style= {{ color: "white" }} name="ios-add-outline" />
        </Button>
      </Right>
      )    
  }

  changeSelectedCourse( courseId )
  {
    this.setState( previousState => {
      previousState.selectedCourse = courseId
      return previousState
    })
  }

  changeCourseId( id, token )
  {
    this.changeSelectedCourse( id )
    this.closeDrawer()
    EventEmitter.emit("userHasChangedCourseID", id, token )
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
              { this.state.user.role === 'teacher' ? <Text> Mis Cursos </Text> : <Text> Mis Hijos </Text>}            
              
            </Row>

            <Row>
              <List dataArray={ this.state.datas } renderRow={data =>
                <ListItem button noBorder onPress={() => this.changeCourseId( data.id, this.state.token ) }>
                    <Left>
                      <Icon active name={"ios-people-outline"} style={ styles.IconStyle } />
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

  _renderRightSide()
  {
    if( this.state.chatActive && this.state.user.role === 'teacher')
    {
      return(
        this._renderAddChatButton()
        )
    }
    else if( this.state.agendaActive && this.state.user.role === 'teacher')
    {
      return(
        this._renderAddTaskButon()
        )
    }
    else
    {
      return ( <Right /> )
    }
  }

  renderFabIcon()
  {
    if( this.state.user.role === 'teacher' )
    {
      return (
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
        )
    }
    else
    {
      return null
    }
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
                  { this.state.homeActive ? <Title style={{ color: 'white' }}>Inicio</Title> : null }

                  { this.state.chatActive ? <Title style={{ color: 'white' }}>Chats</Title> : null }

                  { this.state.profileActive ? <Title style={{ color: 'white' }}>Perfil</Title>: null }

                  { this.state.agendaActive ? <Title style={{ color: 'white' }}>Agenda</Title>: null }

                  { this.state.menuActive ? <Title style={{ color: 'white' }}>Menu</Title>: null }

                </Body>


                { this._renderRightSide() }
                               

              </Header>
            </LinearGradient>


          <Content>
            { this.state.homeActive ? <FeedHome user={ this.state.user }  token={ this.state.token } selectedCourse={ this.state.selectedCourse } /> : null }

            { this.state.chatActive ? <ChatHome user={ this.state.user } token={ this.state.token } selectedCourse={ this.state.selectedCourse }/> : null }

            { this.state.profileActive ? <ProfileHome user={ this.state.user } token={ this.state.token } selectedCourse={ this.state.selectedCourse } />: null }

            { this.state.agendaActive ? <AgendaHome user={ this.state.user } token={ this.state.token } selectedCourse={ this.state.selectedCourse }/>: null }

            { this.state.menuActive ? <Menu user={ this.state.user } token={ this.state.token } selectedCourse={ this.state.selectedCourse } />: null }
          </Content>

          <Footer style={{ backgroundColor: 'white' }}>
            <FooterTab style={{ backgroundColor: 'white' }} >

              <Button transparent onPress={() => this._changeState(1) }>
                <Image  style={ styles.tabIcon } source={ this.state.homeActive ? require('./img/Homeactiv.png') : require('./img/Home.png')} />
              </Button>

              <Button transparent onPress={() => this._changeState(2) }>
                <Image  style={ styles.tabIcon } source={ this.state.chatActive ? require('./img/Chatactiv.png') : require('./img/Chat.png')} />
              </Button>

              { this.renderFabIcon() }


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
