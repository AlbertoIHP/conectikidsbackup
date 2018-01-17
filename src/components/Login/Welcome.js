/* @flow */

import React, { Component } from 'react';
// import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Card, CardItem, Body, Item, Icon, Label, Input, Form } from 'native-base';
import { Image, StyleSheet, Text, View, TextInput} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';

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

  renderButton() {
      if (this.props.loading) {
        return <Spinner color='#FF9800' />;
      }

      return (
        <Button block rounded
          onPress={this.onButtonPress.bind(this)}
          style={{
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 5,
            backgroundColor: '#FF9800'
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold'
            }}
          >Iniciar Sesión</Text>
        </Button>
      );
  }

  onTextPress() {
    Actions.CreateAccount();
  }
  onTextPress1() {
    Actions.RecoveryAccount();
  }

  render() {
    return (
      <Container>
        <Image
        source={require('./img/BackgroundLogin.png')}
        style={styles.imageBackground}
        />
        <Content
          disableKBDismissScroll={true}
          contentContainerStyle={styles.contentStyle}
        >
          <Grid>
            <Row size={10}></Row>
            <Row size={15}>
              <Image
              source={require('./img/logoname.png')}
              resizeMode='contain'
              style={styles.imageLogo}
              />
            </Row>
            <Row size={85}>
              <Image
                source={require('./img/form_login2.png')}
                style={{ height: 400, position: 'absolute'}}
                resizeMode='contain'
              />
              <TextInput placeholder="jasdfjlkajdfsl"/>
            </Row>
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
    flex:1,
    height: 100,
    width: 100,

  },
  contentStyle: {
    flex: 1,
    justifyContent: 'center'
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
