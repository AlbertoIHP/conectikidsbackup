/* @flow */

import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import {
  Container,
  Content,
  Card,
  Form,
  Item,
  Label,
  Input,
  Icon,
  Header,
  Left,
  Button,
  Title,
  Body,
  Right,
  Spinner
} from 'native-base'
import { LinearGradient } from 'expo'
import { Actions } from 'react-native-router-flux'
import { forgotService } from '../../services/ForgotPassword.service'



export default class ForgotPassword extends Component {

  constructor( props )
  {
    super( props )


    this.state = { email: '', loading: false }
  }

  changeEmail( email )
  {
    this.setState( previousState => {
      previousState.email = email
      return previousState
    })
  }

  changeLoading( state )
  {
    this.setState( previousState => {
      previousState.loading = state
      return previousState
    })
  }


  recoverPass() 
  {
    this.changeLoading( true )
    forgotService.sendMail(this.state.email).then( ( response ) => {
      console.log( response )
      this.changeLoading( false )
      Actions.pop()
    }).catch( ( error ) => {
      console.log( error )
      this.changeLoading( false )
    })


  }

  renderButton() 
  {
      if (this.state.loading) {
        return <Spinner color='#fd6342' />;
      }

      return (
        <TouchableOpacity style={styles.touchable} onPress={() => this.recoverPass()}>
          <LinearGradient
            colors={['#fd7292', '#fd6342']}
            style={styles.gradientButton}
          >
            <Text
              style={styles.buttonText}
            >Enviar Email</Text>
          </LinearGradient>
        </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <Image
          source={require('./img/BackgroundLogin.png')}
          style={styles.imageBackground}
        />
        <Content>
          <LinearGradient
            colors={['#fd7292', '#fd6342']}
            style={styles.gradientHeader}
          >
            <Header style={{ backgroundColor: 'transparent' }}>
              <Left>
                <Button
                  transparent
                  onPress={() => Actions.pop()}
                >
                  <Icon style={{ color: 'white' }} name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title style={{ color: 'white' }}>¡Recupérala!</Title>
              </Body>
              <Right />
            </Header>
          </LinearGradient>
          <Card style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
            <Form>
              <Item floatingLabel>
                <Label>
                  <Icon name='mail' style={{ fontSize: 20, color: 'grey', marginRight: 50 }} />
                     test@gmail.com
                </Label>
                <Input
                  onChangeText={( value ) => this.changeEmail( value )}
                  value={this.props.email}
                />
              </Item>
            </Form>
            { this.renderButton() }
            <Body>
              <Text style={styles.errorTextStyle}>
                {this.props.error2}
              </Text>
            </Body>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    position: 'absolute',
    height: '100%'
  },
  touchable: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradientHeader: {
    flex: 1
  },
  gradientButton: {
    width: 200,
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
    fontSize: 15
  },
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red',
    marginBottom: 10
  }
});


