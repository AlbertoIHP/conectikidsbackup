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
  constructor(props) {
    super(props);
    this.state = {
      password1: '',
      password2: '',
      email: this.props.user.email,
      loading: false,
      rut: this.props.user.rut,
      name: this.props.user.name,
      error: ''
    };
  }

  sendData() {
    this.setState( previousState => {
      previousState.error = '';
      return previousState;
    })

    if ((this.state.password1 == this.state.password2) && this.state.password1 != '' && this.state.password2 != '' && this.state.password1.length > 6) {
      this.onLoading();
      let newUser = {};
      newUser.email = this.state.email;
      newUser.rut = this.state.rut;
      newUser.name = this.state.name;
      newUser.picture = this.props.user.picture;
      newUser.password = this.state.password1;
      userServices.update(this.props.user.id, newUser, this.props.token)
        .then((response) => {
          this.onLoading();
          this.props.onLogOut();
        })
        .catch((error) => console.log(error));
    } else if (this.state.password1.length < 6 && this.state.password1 == this.state.password2 && this.state.password1 != ''){
      this.setState( previousState => {
        previousState.error = 'Mínimo 6 caracteres.';
        return previousState;
      })
    }else {
      this.setState( previousState => {
        previousState.error = 'Las contraseñas deben coincidir.';
        return previousState;
      })
    }

  }

  onLoading() {
    this.setState( previousState => {
      previousState.loading = !this.state.loading;
      return previousState;
    })
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

  onChangePassword1(password1) {
    this.setState( previousState => {
      previousState.password1 = password1
      return previousState
    })
  }
  onChangePassword2(password2) {
    this.setState( previousState => {
      previousState.password2 = password2
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
                <Title style={{ color: 'white' }}>Contraseña</Title>
              </Body>
              <Right />
            </Header>
          </LinearGradient>
          <Card style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
            <Form>
              <Item floatingLabel>
                <Label>
                  <Icon name='lock' style={{ fontSize: 20, color: 'grey', marginRight: 50 }} />
                    Contraseña
                </Label>
                <Input
                  secureTextEntry
                  onChangeText={(value) => this.onChangePassword1(value)}
                  value={this.state.password1}
                />
              </Item>
              <Item floatingLabel>
                <Label>
                  <Icon name='lock' style={{ fontSize: 20, color: 'grey', marginRight: 50 }} />
                     Repita contraseña
                </Label>
                <Input
                  secureTextEntry
                  onChangeText={(value) => this.onChangePassword2(value)}
                  value={this.state.password2}
                />
              </Item>
            </Form>
            { this.renderButton() }
            <Body>
              <Text style={styles.errorTextStyle}>
                {this.state.error}
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
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red',
    marginBottom: 10
  }
});
