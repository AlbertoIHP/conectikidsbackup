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
import { userServices } from '../../../services/User.service';

export default class ChangeUser extends Component {
  constructor( props )
  {
    super( props )


    this.state = {
      email: this.props.text.user.email,
      loading: false,
      rut: this.props.text.user.rut,
      name: this.props.text.user.name
    }
  }

  sendData() {
    this.state.loading =true
    let newUser = {};
    newUser.email = this.state.email;
    newUser.rut = this.state.rut;
    newUser.name = this.state.name;
    newUser.picture = this.props.text.user.picture;
    userServices.updateData(this.props.text.user.id,newUser,this.props.text.token)
      .then((response) => {
        this.state.loading = false
        Actions.pop()
      })
      .catch((error) => console.log(error));
  }

  renderButton()
  {
      if (this.state.loading) {
        return <Spinner color='#fd6342' />;
      }

      return (
        <TouchableOpacity style={styles.touchable} onPress={() => this.sendData()}>
          <LinearGradient
            colors={['#fd7292', '#fd6342']}
            style={styles.gradientButton}
          >
            <Text
              style={styles.buttonText}
            >Cambiar datos</Text>
          </LinearGradient>
        </TouchableOpacity>
    );
  }

  onChangeEmail(email) {
    this.setState( previousState => {
      previousState.email = email
      return previousState
    })
  }
  onChangeRut(rut) {
    this.setState( previousState => {
      previousState.rut = rut
      return previousState
    })
  }
  onChangeName(name) {
    this.setState( previousState => {
      previousState.name = name
      return previousState
    })
  }

  render() {
    return (
      <Container>
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
                <Title style={{ color: 'white' }}>Cambiar parámetros</Title>
              </Body>
              <Right />
            </Header>
          </LinearGradient>
          <Card style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
            <Form>
              <Item floatingLabel>
                <Label>
                  <Icon name='mail' style={{ fontSize: 20, color: 'grey', marginRight: 50 }} />
                     Prueba@correodeprueba.cl
                </Label>
                <Input
                  onChangeText={( value ) => this.onChangeEmail(value)}
                  value={this.state.email}
                />
              </Item>
              <Item floatingLabel>
                <Label>
                  <Icon name='mail' style={{ fontSize: 20, color: 'grey', marginRight: 50 }} />
                     Nombre
                </Label>
                <Input
                  onChangeText={( value ) => this.onChangeName(value)}
                  value={this.state.name}
                />
              </Item>
              <Item floatingLabel>
                <Label>
                  <Icon name='mail' style={{ fontSize: 20, color: 'grey', marginRight: 50 }} />
                     RUT
                </Label>
                <Input
                  onChangeText={( value ) => this.onChangeRut(value)}
                  value={this.state.rut}
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
});
