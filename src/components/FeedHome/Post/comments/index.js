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
import Modal from 'react-native-modal'


import { commentService } from '../../../../services/Comment.service'
import { storage } from '../../../../services/localStorage.service'


class Comments extends React.Component {

    constructor(props) {
        super(props);
        let params = props.navigation.state.params;
        this._onSend = this._onSend.bind(this)
        this.state = {
          comments: [],
          msg: '',
          user: [],
          activityId: this.props.activityId,
          isModalVisible: false
        }
    }

    async componentWillMount() {
      let user =  await storage.getItem( 'currentUser' );
      this.changeUser(user);
        if (this.props.comments.length < 0 ){
          this.changeState()
        }
    }
    changeState() {
      this.setState( previousState => {
        previousState.comments = this.props.comments;
        return previousState
      })
    }
    changeModal( state )
    {
      this.setState( previousState => {
        previousState.isModalVisible = state
        return previousState
      })
    }
    _onSend() {
      if(this.state.msg == ''){
        this.changeModal( true )
      }else {
        commentService.store(this.state.msg, this.state.user.id, this.state.activityId)
        .then((response) => Actions.pop())
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
      if (this.state.comments.length > 0 ){
        Object.values(this.state.comments).map((prop, key) => {
          return (
            <Comment info={prop.createdBy_id} text={prop.content} />
          );
        });
      }
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
              <Modal
              isVisible={ this.state.isModalVisible }
              onBackdropPress={() => this.setState({ isModalVisible: false })}>
                <Container style={{ flex: 0.3, borderRadius: 40 }}>

                <LinearGradient colors={['#fd7292', '#fd6342']} >
                  <Header style={{ backgroundColor: 'transparent' }}>

                    <Left>
                    </Left>

                    <Body>
                      <Title style={{ color: 'white' }}> Error </Title>
                    </Body>

                    <Right>
                    </Right>
                  </Header>
                </LinearGradient>

                  <Content contentContainerStyle={{ borderRadius: 3, backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>
                      ¡ Recuerda rellenar todos los campos necesarios !
                    </Text>

                      <TouchableOpacity style={styles.touchable} onPress={() => this.setState({ isModalVisible: false })}>
                        <LinearGradient colors={['#fd7292', '#fd6342']} style={styles.gradient} >
                          <Text style={styles.buttonText} >
                             Cerrar
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>

                  </Content>
                </Container>
              </Modal>
              {

                this.renderContent()
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
