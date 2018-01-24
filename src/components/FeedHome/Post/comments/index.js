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
  Item
} from "native-base"
import { LinearGradient } from 'expo'
import Comment from './components/comment';

import { commentService } from '../../../../services/Comment.service'
import { storage } from '../../../../services/localStorage.service'


class Comments extends React.Component {

    constructor(props) {
        super(props);
        let params = props.navigation.state.params;
        this._onSend = this._onSend.bind(this)
        this.state = {
          comments: this.props.comments,
          msg: '',
          user: [],
          activityId: this.props.comments[0].activity_id
        }
    }

    async componentWillMount() {
      let user =  await storage.getItem( 'currentUser' );
      this.changeUser(user);
    }

    _onSend() {
      if(this.state.msg == ''){
        console.log('modal error');
      }else {
        commentService.store(this.state.msg, this.state.user.id, this.state.activityId)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      }
    }

    changeMsg( msg )
    {
      this.setState( previousState => {
        previousState.msg = msg
        return previousState
      })
    }
    changeUser( user )
    {
      this.setState( previousState => {
        previousState.user = user
        return previousState
      })
    }
    renderContent() {
      Object.values(this.state.comments).map((prop, key) => {
          return (
              <Comment info={prop.createdBy_id} text={prop.content} />
          );
      });
    }

    render() {
        return(
          <Container style={{ backgroundColor: 'white'}} >
              <LinearGradient colors={['#fd7292', '#fd6342']} >
                <Header style={{ backgroundColor: 'transparent' }}>

                  <Left>
                    <Button transparent onPress={() => Actions.pop() } >
                      <Icon style= {{ color: "white" }} name="arrow-back" />
                    </Button>
                  </Left>

                  <Body>
                    <Title style={{ color: 'white' }}> Comentarios </Title>
                  </Body>

                  <Right />

                </Header>
              </LinearGradient>


            <Content style={{ backgroundColor: 'white', paddingTop: 10}} >
              {
                this.state.comments &&
                Object.values(this.state.comments).map((prop, key) => {
                    return (
                        <Comment info={prop.createdBy_id} text={prop.content} />

                    );
                })

               }
               <Footer style={{ backgroundColor: 'transparent'}}>
               <Item rounded style={{ flex: 1 }}>
                <Input
                  placeholder="Escribe un comentario..."
                  onChangeText={ (value) => this.changeMsg(value)}
                />
                <Icon active name='send' onPress={() => this._onSend() } />
                </Item>
               </Footer>

            </Content>
          </Container>
        )
    }
}
export default Comments;

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
