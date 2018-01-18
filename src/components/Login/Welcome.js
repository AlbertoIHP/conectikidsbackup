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
Spinner
} from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { Image, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../../actions';

class Welcome extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onTextPress1() {
    Actions.ForgotPassword();
  }

  renderButton() {
      if (this.props.loading) {
        return <Spinner color='#fd6342' />;
      }
      return (

        <TouchableOpacity style={styles.touchable} onPress={() => this.onButtonPress() }>
          <LinearGradient
            colors={['#fd7292', '#fd6342']}
            style={styles.gradient}
          >
            <Text
              style={styles.buttonText}
            >Iniciar Sesión</Text>
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
        <Content
          contentContainerStyle={styles.contentStyle}
          disableKBDismissScroll
        >
          <Grid>
            <Row size={10} />
            <Row size={15}>
              <Image
              source={require('./img/logoname.png')}
              resizeMode='contain'
              style={styles.imageLogo}
              />
            </Row>
            <Row size={70}>
              <Card style={{ marginLeft: 10, marginRight: 10 }}>
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
                  <Item floatingLabel last>
                    <Label>
                      <Icon name='lock' style={{ fontSize: 20, color: 'grey', marginRight: 50 }} />
                      Contraseña
                    </Label>
                    <Input
                      secureTextEntry
                      onChangeText={this.onPasswordChange.bind(this)}
                      value={this.props.password}
                    />
                  </Item>
                </Form>
                {this.renderButton()}
                <Body>
                  <Text style={styles.errorTextStyle}>
                    {this.props.error}
                  </Text>
                  <Text
                    style={{ fontSize: 15, textDecorationLine: 'underline', marginTop: 20 }}
                    onPress={this.onTextPress1}
                  >¿ Has olvidado tu contraseña ?</Text>
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
    position: 'absolute'
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
  }
});

const mapStateToPros = ({ auth }) => {
  const { email, password, error, loading } = auth;
    return {
      email,
      password,
      error,
      loading
    };
};

export default connect(mapStateToPros, { emailChanged, passwordChanged, loginUser })(Welcome);
