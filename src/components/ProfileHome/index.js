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
  Fab,
  ActionSheet
} from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import { LinearGradient } from 'expo'
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal'
import { ImagePicker } from 'expo'
import { userServices } from '../../services/User.service';
import EventEmitter from 'react-native-eventemitter';


const window = Dimensions.get('window');

var BUTTONS = ["Tomar foto", "Abrir galería", "Cancelar"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;


class ProfileHome extends Component {




  async _pickImage(useCamera)
  {

    let pickerResult

    if (useCamera) 
    {
      pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    } 
    else 
    {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],        
      });
    }

    if (pickerResult.cancelled)
    {
      return;
    }

    console.log("ESTE ES EL RESULTADO DE LA CAMARA")
    console.log(pickerResult)
    this.setState( previousState => {
      previousState.user.picture = pickerResult.uri
      previousState.pickerResult = pickerResult
      this._handleImagePicked(previousState.pickerResult)
      return previousState
    })


      

  }

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {

      if (!pickerResult.cancelled) 
      {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();


      }
    } catch (e) {

      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {

      if( uploadResult )
      {
        console.log("LOGGGG")
        console.log(uploadResult.location)
        await this.setState( previousState => {
          previousState.user.picture = uploadResult.location


          let newUser = {};
          newUser.email = previousState.user.email;
          newUser.rut = previousState.user.rut;
          newUser.name = previousState.user.name;
          newUser.picture = previousState.user.picture;
          userServices.updateData( previousState.user.id, newUser, this.props.token)
            .then((response) => {
              previousState.user = response.data
              Actions.pop();
            })
            .catch((error) => console.log(error));
          
          return previousState
        })
      }      
    }
  }


  constructor( props )
  {

    super( props )
    this.state = {
      user: this.props.user,
      loading: false,
      isModalVisible: false,
      text: '',
      data: { id: this.props.selectedCourse,
              course_id: this.props.selectedCourse
            },
      pickerResult: false
     }
  }

  componentDidMount() {
    EventEmitter.on('UserHasChanged', (user) => {
      this.setState( previousState => {
        previousState.user = user;
        return previousState;
      })
    });
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

  onSuccess() {
    this.props.realoadAll(this.state.data);
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
        <TouchableOpacity onPress={() => {
          ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Selecciona una foto"
              },
              buttonIndex => {
                if (buttonIndex == 0) {
                  this._pickImage(true);
                }else if (buttonIndex == 1) {
                  this._pickImage(false);
                }else {
                  console.log('cancelled');
                }
              }
            )}
        }>
          <Thumbnail large source={{ uri: this.state.user.picture }} />
        </TouchableOpacity>
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



async function uploadImageAsync(uri) {
  let apiUrl = 'https://conectikidsback.herokuapp.com/upload';

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });


  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
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
