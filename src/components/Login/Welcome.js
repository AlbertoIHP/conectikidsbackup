/* @flow */

import React, { Component } from 'react';
import {
Container,
Content,
Card,
Body,
Item,
Icon,
Label,
Input,
Form,
Spinner,
Row,
Grid
} from 'native-base';
import { Image, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';

import { authService } from '../../services/Auth.service'
import { storage } from '../../services/localStorage.service'



class Welcome extends Component {

  constructor( props )
  {
    super( props )

    this.state = {
      email: 'rara@gmail.com',
      password: 'cristobal',
      logeando: ''
    }

  }


  changeEmail( email )
  {
    this.setState( previousState => {
      previousState.email = email
      return previousState
    })
  }

  changePassword( pass )
  {
    this.setState( previousState => {
      previousState.password = pass
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

  async singIn()
  {
    this.changeLoading( true )

  await authService.login( { email: this.state.email, password: this.state.password} )
  .then( async ( response ) => {
    await storage.setItem( 'token', response.data.token )
    await storage.setItem( 'currentUser', response.data.user)
    this.changeLoading( false )
    Actions.reset('MainContainer')
  })
  .catch( ( error ) => {
    console.log(error)
    this.changeLoading( false )
  });
  }







  renderButton() 
  {
      if ( this.state.loading ) 
        return <Spinner color='#fd6342' />;
      
      return (

        <TouchableOpacity style={styles.touchable} onPress={() => this.singIn()}>
          <LinearGradient colors={['#fd7292', '#fd6342']} style={styles.gradient} >
            <Text style={styles.buttonText} >
              Iniciar Sesión
            </Text>
          </LinearGradient>
        </TouchableOpacity>
    );
  }

  render() 
  {
    return (
      <Container style={{ flex: 1 }}>
        <Image source={require('./img/BackgroundLogin.png')} resizeMode='cover' style={styles.imageBackground} />
        
        <Content contentContainerStyle={styles.contentStyle} disableKBDismissScroll >
          <Grid>
            <Row size={10} />
            <Row size={15}>
              <Image source={require('./img/logoname.png')} resizeMode='contain' style={styles.imageLogo} />
            </Row>

            <Row size={70}>
              <Card style={ styles.cardStyle }>
                <Form>
                  <Item floatingLabel>
                    <Label>
                      <Icon name='mail' style={ styles.iconInput } />
                         test@gmail.com
                    </Label>
                    <Input
                      onChangeText={ ( value ) => this.changeEmail( value ) }
                      value={this.state.email}
                    />
                  </Item>
                  <Item floatingLabel last>
                    <Label>
                      <Icon name='lock' style={ styles.iconInput } />
                      Contraseña
                    </Label>
                    <Input
                      secureTextEntry
                      onChangeText={ ( value ) => this.changePassword( value ) }
                      value={this.state.password}
                    />
                  </Item>
                </Form>
                {this.renderButton()}
                <Body>
                  <Text style={ styles.errorTextStyle }>
                    {this.props.error}
                  </Text>
                  <Text style={ styles.forgotStyle } onPress={ () => Actions.ForgotPassword() }>
                    ¿ Has olvidado tu contraseña ?
                  </Text>
                </Body>
              </Card>
            </Row>
            
            <Row size={15} />
          </Grid>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    position: 'absolute',
    height: "100%",
    width: "100%"
  },
  imageLogo: {
    flex: 1,
    height: 100,
    width: 100
  },
  contentStyle: {
    flex: 1,
    justifyContent: 'center'
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
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  },
  forgotStyle:
  { 
    fontSize: 15, 
    textDecorationLine: 'underline', 
    marginTop: 20 
  },
  iconInput:
  { 
    fontSize: 20, 
    color: 'grey', 
    marginRight: 50 
  },
  cardStyle:
  { 
    marginLeft: 10, 
    marginRight: 10 
  }
});


export default Welcome;

