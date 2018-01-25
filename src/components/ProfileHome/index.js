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
  Body
} from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import { LinearGradient } from 'expo'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get('window');


class ProfileHome extends Component {

  constructor( props )
  {
    super( props )
    this.state = {
      user: this.props.user,
      loading: false }
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
          <View style={{ marginTop: 10, flex: 1 }}>
            <ListItem style={styles.listItem}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#ea456a' }}>RUT</Text>
              <Text note> {this.state.user.rut}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#ea456a' }}>Email</Text>
              <Text note>{ this.state.user.email }</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#ea456a' }}>Rol</Text>
              <Text note>{ this.state.user.role }</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#ea456a' }}>Something</Text>
              <Text note>bla bla</Text>
            </ListItem>
          </View>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column'
  }
});


export default ProfileHome;
