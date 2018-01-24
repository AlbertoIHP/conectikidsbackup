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
import Modal from 'react-native-modal'


import { commentService } from '../../../../services/Comment.service'
import { storage } from '../../../../services/localStorage.service'

import { socket } from '../../../../services/socket'

class Comments extends React.Component {

    constructor(props) {
        super(props);
        let params = props.navigation.state.params;
        this._onSend = this._onSend.bind(this)
        this.state = {
          comments: [],
          activityId: this.props.activityId,
          isModalVisible: false,
          newComment: { 
            content: '', 
            activity_id: this.props.activityId,
            createdBy_id: this.props.user.id
            }
        }
    }

    componentDidMount()
    {
      this.getComments()

      socket.on('commentAdded', ( comment ) => {


        if( comment.activity_id === this.props.activityId )
        {
          this.setState( previousState => {
            this.getComments()
            console.log("ESCUCHE EL EVENTO")
            console.log(previousState.comments)
            return previousState
          })
        }
      })


    }


    changeComments (comments)
    {
      this.setState( previousState => {

        previousState.comments = comments
        return previousState
      })
    }


    getComments() 
    {
      commentService.getCommentsFromActivity( this.props.activityId, this.props.token)
      .then((response) => { 
        this.changeComments(response.data.activityComments) 
      })
      .catch((error) => console.log(error))
    }


    toObject(arr) 
    {
      var rv = {};
      for (var i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
      return rv;
    }


    changeModal( state )
    {
      this.setState( previousState => {
        previousState.isModalVisible = state
        return previousState
      })
    }






    _onSend() 
    {
      if(this.state.newComment.content == '')
      {
        this.changeModal( true )
      }
      else 
      {
        commentService.store( this.state.newComment )
        .then((response) => {
          socket.emit( 'commentAdded', this.state.newComment )

        })
        .catch((error) => console.log(error));
      }
    }

    changeMsg( msg )
    {
      this.setState( previousState => {
        previousState.newComment.content = msg
        return previousState
      })
    }









    renderContent( comment ) 
    {

      return (
                    <View style={styles.parentContainer}>
                        <View style={styles.container}>
                            <View style={{flex: 1}}>
                                <Image style={styles.image} source={{uri: comment.createdBy_id.picture}}/>
                            </View>
                            <View style={{flex: 6}}>
                            <Text>
                                <Text style={{fontWeight: 'bold'}}>
                                    { comment.createdBy_id.name }
                                </Text>
                                {`: ${comment.content}`}
                            </Text>
                            </View>
                        </View>
                        <View
                          style={{
                            borderBottomColor: '#a5a5a5',
                            borderBottomWidth: 0.8,
                            height: 20
                          }}/>
                    </View>


                    )
    }



    render() 
    {
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

            <FlatList
              data={this.state.comments}
              renderItem={({ item }) =>  this.renderContent( item ) }  />


            </Content>


               <Footer style={{ backgroundColor: 'transparent'}}>
               <Item rounded style={{ flex: 1 }}>
                <Input
                  placeholder="Escribe un comentario..."
                  onChangeText={ (value) => this.changeMsg(value)}
                  value={ this.state.newComment.content }
                />
                 <Icon active name='send' onPress={() => this._onSend() } />
                </Item>
               </Footer>



               <View>
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
               </View>

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
