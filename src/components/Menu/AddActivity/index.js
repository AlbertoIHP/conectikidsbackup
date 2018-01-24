import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  CameraRoll
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
  Container,
  Icon,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  Fab,
  Drawer,
  List,
  Badge,
  ListItem,
  Grid,
  Row,
  Column,
  Spinner
} from "native-base"
import { LinearGradient } from 'expo'

import { socket } from '../../../services/socket'
import { activityService } from '../../../services/Activity.service'
import Modal from 'react-native-modal'


class AddActivity extends Component {

  //IMAGEN HARDCODEADA DEBE SUBIRSE CORRECTAMENTE

  constructor(props)
  {
    super(props);
    this.state ={ 
      newActivity: {
        name: '',
        description: '',
        createdBy_id : this.props.text.user.id,
        course_id: this.props.text.selectedCourse,
        urlPhoto: 'http://www.jardinesinfantiles.cl/chocolate/fotos/p1000321%20copy%20.jpg',
        activityType: this.props.text.activityType
      },
      taggedPeople: [],
      loading: false,
      isModalVisible: false
    }

    this._publishActivity = this._publishActivity.bind(this);
    this._explore = this._explore.bind(this);
    this._openCamera = this._openCamera.bind(this);
  }

  _publishActivity()
  {

    if( this.state.newActivity.name === '' || this.state.newActivity.description === '' )
    {
      this.changeModal( true )
    }
    else
    {

      this.changeLoading( true )


      activityService.store( this.state.newActivity ).then( ( response ) => {

        socket.emit('activityAdded', JSON.stringify( this.state.newActivity ))
        this.changeLoading( false )
        Actions.pop()
        
        
      }).catch( ( error ) => {
        console.log( error )
        this.changeLoading( false )
      })      
    }


  }


  changeModal( state )
  {
    this.setState( previousState => {
      previousState.isModalVisible = state
      return previousState
    })
  }


  returnData(childrens) 
  {
    let tagsRender = childrens;
    let tags = [];
    tags.forEach((value) => {
      tags.push(value.id);
    })
    this.setState({
      tagsRender: tagsRender,
      tags: tags
    })
  }


  _explore()
  {
  	console.log("Aqui va la logica de subir la foto")
    // console.log("started");
    // Camera.uploadPhoto('library')
    // .then(function(url){
    //   console.log("ended");
    //   this.setState({photoUrl: url});
    // }.bind(this));
  }




  _openCamera()
  {
  	console.log("Aqui debe ir la logica para abrir la camara (Dependera si es Android o IOS)")
    // this.setState({
    //   loading: true
    // })
    // Camera.uploadPhoto('camera')
    // .then(function(url){
    //   console.log(url);
    //   this.setState({
    //     photoUrl: url,
    //     loading: false
    //   });
    // }.bind(this)).catch(error => {
    //   this.setState({
    //     loading: false
    //   })
    // });
  }


  getPhotos()
  {
  	console.log("Aqui debe ir la logica para abrir el rollo de camara")
    // console.log('hasd');
    // CameraRoll.getPhotos({
    //   first: 20,
    //   assetType: 'All'
    // })
    // .then(r => this.setState({ photos: r.edges }))
  }


  changeLoading( state )
  {
    this.setState( previousState => {
      previousState.loading = state
      return previousState
    })
  }



  changeName( name )
  {
    this.setState( previousState => {
      previousState.newActivity.name = name
      return previousState 
    })
  }


  changeDescription( description )
  {
    this.setState( previousState => {
      previousState.newActivity.description = description
      return previousState
    })
  }

  tagSomeOne( someone )
  {
    this.setState( previousState => {
      previousState.taggedPeople.push( someon )
      return previousState
    })
  }

  renderContent()
  {
    if( this.state.loading )
    {
      return (
          <Spinner color='#fd6342' />
        )
    }
    else
    {
      return( 
            <View style={styles.container}>
              <Image source={require('./img/activityDescription.png')}/>
              <TextInput
                maxLength={100}
                style={[styles.textInput]}
                multiline={true}
                numberOfLines={2}
                onChangeText={( name ) => this.changeName( name ) }
                placeholder="Dale un nombre a tu actividad"
                value={this.state.newActivity.name}/>

              <TextInput
                maxLength={100}
                style={[styles.textInput]}
                multiline={true}
                numberOfLines={2}
                onChangeText={(description) => this.changeDescription( description ) }
                placeholder="Describela para saber mas"
                value={this.state.newActivity.description}/>


              <Image style={styles.separator} source={require('./img/linea.png')} />
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={[
                  {key: require('./img/photo-camera.png'), func: this.getPhotos},
                  {key: require('./img/picture.png'), func: this._explore},
                  {key: require('./img/Feeling.png')},
                  {key: require('./img/user.png'), func:this._tag}
                ]}
                renderItem={({item}) =>
                <TouchableOpacity onPress={item.func} style={styles.containerIcon}>
                  <Image source={item.key} />
                </TouchableOpacity>
              }
              />
              <TouchableOpacity onPress={this._publishActivity} style={styles.button}>
                <Image source={require('./img/publicar.png')}/>
              </TouchableOpacity>



              <View>

                  <Modal 
                  isVisible={ this.state.isModalVisible }
                  onBackdropPress={() => this.setState({ isModalVisible: false })}>
                    <View style={{ flex: 0.4, backgroundColor: 'white', borderRadius: 10,justifyContent: 'space-between' }}>
                      <View style={{ flex: 1 }}  >


                        <View>

                          <Text> Hola ! </Text>
                        </View>   


                      </View>
                    </View>
                  </Modal>
              </View>


            </View>
        )
    }
  }


  render () 
  {
    return(

        <Container style={{ backgroundColor: 'white'}} >
            <LinearGradient colors={['#fd7292', '#fd6342']} >
              <Header style={{ backgroundColor: 'transparent' }}>

                <Left>
                  <Button transparent onPress={() => Actions.pop() } >
                    <Icon style= {{ color: "white" }} name="arrow-back" />
                  </Button>
                </Left>

                <Body>
                  <Title style={{ color: 'white' }}> { this.props.text.activityType } </Title>
                </Body>

                <Right />
                
              </Header>
            </LinearGradient>


          <Content style={{ backgroundColor: 'white'}} >
            { this.renderContent() }
          </Content>
        </Container>
    )
  }
}


const styles = StyleSheet.create({
  tag: 
  {
    marginLeft: 10,
  },
  containerTags: 
  {
    flexDirection: 'row',
  },
  container:
  {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    flex: 1
  },
  separator:
  {
    marginTop:10,
    marginBottom: 10,
  },
  button:
  {
    marginTop: 10,
    alignItems: 'center',
  },
  listContainer:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerIcon:
  {
    alignItems: 'center',
  },
  textInput: 
  {
    marginTop:20,
    fontSize: 15,
    height: 80,
    color: '#35405260',
    borderColor: 'gray',
  }
})


export default AddActivity;
