import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  CameraRoll,
  Platform
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
  Container,
  Icon,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  Fab,
  Drawer,
  List,
  Badge,
  ListItem,
  Grid,
  Row,
  Column,
  Spinner,
  Input,
  Item,
  Thumbnail,
  Label
} from "native-base"
import { LinearGradient } from 'expo'
import EventEmitter from "react-native-eventemitter"

import { chatService } from '../../services/Chat.service'
import { chatUserService } from '../../services/ChatUser.service'
import { socket } from '../../services/socket'

class ChatHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          comments: [],
          selectedCourse: this.props.selectedCourse
        }
    }

    componentDidMount()
    {
      this.getComments( this.props.selectedCourse )

      socket.on('chatAdded', ( chat ) => {
        chat = JSON.parse(chat)
        console.log(chat)
        console.log( this.state.selectedCourse )
        if( chat.course_id === this.state.selectedCourse )
        {
          this.getComments( this.state.selectedCourse)
        }
      })

    EventEmitter.on("userHasChangedCourseID", ( idCourse, token, date ) => {
      //AQUI SE DEBE DE HACER EL FETCH PARA OBTENER TODAS LAS HISTORIAS DE LA ID DEL CURSO ENTREGADA
      this.changeSelectedCourse( idCourse )
      this.getComments( idCourse )

    })
    }

    changeSelectedCourse( course )
    {
      this.setState( previousState => {
        previousState.selectedCourse = course
        return previousState
      })
    }

    changeComments (comments)
    {
      this.setState( previousState => {

        previousState.comments = comments
        return previousState
      })
    }


    getComments( selectedCourse ) 
    {
      console.log( selectedCourse )

      chatUserService.getChatsByCourseAndUserId(  selectedCourse+'&'+this.props.user.id , this.props.token)
      .then((response) => {
        console.log("LOOOOOOOOOOOOOOOOG")
        console.log(response.data)
        this.changeComments( response.data.userChats ) 
      })
      .catch((error) => console.log(error))

    }



    renderContent( chat ) 
    {

      return (

              <ListItem avatar onPress={ () => Actions.Chat({ chat: chat, selectedCourse: this.state.selectedCourse, token: this.props.token, user: this.props.user })} >
                <Left>
                  <Thumbnail small  source={{ uri: chat.picture }} />
                </Left>
                <Body>
                  <Text>
                    {chat.name}
                  </Text>
                  <Text numberOfLines={1} note>
                    {chat.description}
                  </Text>
                </Body>
                <Right>
                  <Text note>
                    {chat.createdAt.split('T')[0]}
                  </Text>
                </Right>
              </ListItem>)
    }


    _renderContent()
    {

      try
      {
        if( this.state.comments.length > 0 )
        {
        return(
                  <FlatList
                    data={this.state.comments}
                    renderItem={({ item }) =>  this.renderContent( item ) }  />
          )           
        }
        else
        {
          return(
            <View style={{ flex: 0.3, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
              <Label> Aun no hay chats disponibles </Label>
            </View>

            )
        }        
      }
      catch( error )
      {
          return(
            <View style={{ flex: 0.3, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
              <Label> Aun no hay chats disponibles </Label>
            </View>

            )        
      }


	
    }

    render() 
    {
        return(
          <Container style={{ backgroundColor: 'white'}} >

            <Content style={{ backgroundColor: 'white', paddingTop: 10}} >

            { this._renderContent() }



            </Content>

          </Container>
        )
    }
}
export default ChatHome;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'space-between',
    backgroundColor: '#f4f6f7'
  },
  itemsBottom: {
    flexDirection:'column',
    justifyContent: 'flex-end'
  },
  touchable: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    height: 50
  },
  gradient: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    ...Platform.select({
      ios: { zIndex: 2 },
      android: { elevation: 2 }
    }),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    fontSize: 20
  },
})
