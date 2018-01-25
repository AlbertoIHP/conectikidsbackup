import React, { Component } from 'react';
import { Spinner, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail, Label } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
import { LinearGradient } from 'expo'
import { Actions } from 'react-native-router-flux'
import { socket } from '../../../services/socket'
import { messageService } from '../../../services/Message.service'

export default class Chat extends Component {

  constructor( props )
  {
  	super( props )


    //Se enlazan las funciones al objeto
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);


  	this.state = {
  		messages: [],
  		user: this.props.user
  	}
  }
   

  componentDidMount()
  {
    //Escuchamos el evento, y cargamos la funcion

    this.fetchMessages( this.props.chat.id )

    socket.on('message', (messages) => {
      console.log("Escuche el evento de mensajesss")
      console.log(messages)
      this.onReceivedMessage(messages)
    });  	
  }

  fetchMessages( chatId )
  {
    messageService.getMessagesByCourseId( chatId, this.props.token ).then( ( response ) => {
      let messages = response.data.chatMessagess

      for( let msg of messages )
      {
        console.log(msg)
        this._storeMessages( msg )
      }

      
    }).catch( ( error ) => {
      console.log( error )
    })
  }









  //Cuando se reciben mensajes
  onReceivedMessage(messages) 
  {
    if( messages.chat_id === this.props.chat.id )
    {
      this._storeMessages(messages)
    }    
  }





  //Esta funcion, recibe el mensaje para concatenarlo al state
  _storeMessages(messages) 
  {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  //Cuando se envie un mensaje, se avisara al servidor mediante el evento, pero tamvbien se guardara en el state
  onSend(messages=[]) 
    {
      messages[0].chat_id = this.props.chat.id

      messages[0].user = { _id: this.state.user.id , name: this.state.user.name, avatar: this.state.user.picture }

      console.log(messages[0])


      messageService.store( messages[0] ).then( ( response ) => {

       console.log(response.data)
       socket.emit('message', messages[0]);   
      }).catch( ( error ) => {
        console.log( error )
      })
    }





//   renderCustomView={(msg) => <Text note style={{ color: 'white'}} > {msg.currentMessage.user.name}: </Text> }
          
  renderContent()
  {
      return(
          <GiftedChat
            showUserAvatar={true}
            placeholder="Escribe un mensaje..."
            messages={this.state.messages}
            onSend={this.onSend}
            user={{ _id: this.state.user.id }}
          />
        )
            

  }

  render() 
  {
      return (
        <Container>
              <LinearGradient colors={['#fd7292', '#fd6342']} >
                <Header style={{ backgroundColor: 'transparent' }}>

                  <Left>
                    <Button transparent onPress={() => Actions.pop() } >
                      <Icon style= {{ color: "white" }} name="arrow-back" />
                    </Button>
                  </Left>

                  <Body>
                    <Thumbnail  small  source={{ uri: this.props.chat.picture }} />
                    <Title style={{ color: 'white' }}>
                     { this.props.chat.name }
                    </Title>                  
                  </Body>

                  <Right />
                  
                </Header>
              </LinearGradient>

          {this.renderContent()}


        </Container>
        )

  }
}

