import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  View
} from 'react-native'
import {
  Spinner,
  Thumbnail,
  List,
  ListItem,
  Body,
  Icon,
  Right,
  Container,
  Header,
  Left,
  Title,
  Content,
  Form,
  Item,
  Label,
  Input,
  Card,
  Fab
} from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import { LinearGradient } from 'expo'
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal'


const window = Dimensions.get('window');


class ProfileHome extends Component {

  constructor( props )
  {
    super( props )
    this.state = {
      user: this.props.user,
      loading: false,
      isModalVisible: false,
      text: ''
     }
  }

  changeModal(state){
    this.setState(previousState => {
      previousState.isModalVisible = state
      return previousState
    })
  }

  changeTextInput(text) {
    this.setState( previousState => {
      previousState.text = text
      return previousState
    })
  }

  _onButtonPress() {

  }

  render() {
    return (
    <Grid>
        <Row
        style={{
          flex: 1,
          height: window.height / 3,
          backgroundColor: '#f9dfe5',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        >
          <Thumbnail large source={{ uri: this.state.user.picture }} />
          <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 10
            }}
          >
          { this.state.user.name } </Text>
          <Text> {this.state.user.id} </Text>
        </Row>
        <Row style={{ height: window.height / 2, flex: 1 }}>
          <List style={{ flex: 1 }}>
            <ListItem>
              <Body>
                <Text style={styles.itemTitle}>RUT</Text>
                <Text note> {this.state.user.rut}</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.itemTitle}>Email</Text>
                <Text note>{ this.state.user.email }</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.itemTitle}>Rol</Text>
                <Text note>{ this.state.user.role }</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.itemTitle}>Rol</Text>
                <Text note>{ this.state.user.role }</Text>
              </Body>
            </ListItem>
          </List>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 60,
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#ea456a'
  },
  touchable:
  {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    height: 50
  },
  gradient:
  {
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
  buttonText:
  {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    fontSize: 20
  },
});


export default ProfileHome;
