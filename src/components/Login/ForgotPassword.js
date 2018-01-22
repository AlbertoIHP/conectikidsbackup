/* @flow */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
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
} from 'native-base';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { emailChanged, recoveryUser } from '../../actions';

class ForgotPassword extends Component {

  onEmailChange(text) 
  {
    this.props.emailChanged(text);
  }

  onButtonPressRecovery() 
  {
    const { email } = this.props;
    this.props.recoveryUser({ email });
  }

  renderButton() 
  {
      if (this.props.loading) {
        return <Spinner color='#fd6342' />;
      }

      return (
        <TouchableOpacity style={styles.touchable} onPress={() => this.onButtonPressRecovery()}>
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
                  onChangeText={this.onEmailChange.bind(this)}
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

const mapStateToPros = ({ auth }) => {
  const { email, password, error2, loading } = auth;
    return {
      email,
      password,
      error2,
      loading
    };
};

export default connect(mapStateToPros, { emailChanged, recoveryUser })(ForgotPassword);
