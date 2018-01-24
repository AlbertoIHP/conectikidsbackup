import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  CameraRoll,
  Platform,
  TouchableHighlight
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import fuzzy  from 'fuzzy'
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
  Spinner,
  Card,
  CardItem,
  Item,
  Input,
  Thumbnail,
  CheckBox,
  Form,
  Label,
  Text
} from "native-base"
import { LinearGradient } from 'expo'

import { socket } from '../../../services/socket'
import { activityService } from '../../../services/Activity.service'
import { childrenService } from '../../../services/Children.service'
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
      isModalVisible: false,
      showToTag: false,
      coursePeople: [],
      showedUsers: [],
      toFind: '',
      reload: true,
      data: []
    }

    this._publishActivity = this._publishActivity.bind(this);
    this._explore = this._explore.bind(this);
    this._openCamera = this._openCamera.bind(this);
    this._tag = this._tag.bind(this)
  }


  componentDidMount()
  {
    childrenService.getParentsCourse( this.props.text.selectedCourse, this.props.text.token ).then( ( response ) => {
      let infoArray = response.data.parentsArray


      for( let i in infoArray )
      {
        infoArray[i].isTagged = false
      }

      this.changeCoursePeople( infoArray )
      this.changeShowedUsers( infoArray )
    }).catch( ( error ) => {
      console.log( error )
    })


    this.setState( previousState => {
      previousState.data = [
      {key: require('./img/photo-camera.png'), func: this.getPhotos},
      {key: require('./img/picture.png'), func: this._explore},
      {key: require('./img/Feeling.png')},
      {key: require('./img/user.png'), func:this._tag}
      ]

      return previousState
    })
  }


  changeCoursePeople( coursePeople )
  {
    this.setState( previousState => {
      previousState.coursePeople = coursePeople
      return previousState
    })
  }

  changeShowedUsers( showedUsers )
  {
    this.setState( previousState => {
      previousState.showedUsers = showedUsers
      return previousState
    })
  }




  showTagContent( state )
  {
    this.setState( previousState => {
      previousState.showToTag = state
      return previousState
    })
  }

  _tag()
  {
    console.log("Aqui va la logica para etiquetar")
    this.showTagContent( true )
    this.changeModal( true )
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




  _publishActivity()
  {

    if( this.state.newActivity.name === '' || this.state.newActivity.description === '' )
    {
      this.showTagContent( false )
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

  changeReload( state )
  {
    this.setState( previousState => {
      previousState.reload = state
      return previousState
    })
  }

  async tagSomeOne( someone )
  {


    if( someone.isTagged )
    {
      console.log("ELIMINANDO TAG ################################################################################")
      await this.setState( previousState => {

        for( let i in previousState.taggedPeople )
        {
          if( previousState.taggedPeople[i] === someone)
          {
            previousState.taggedPeople.splice( i, 1 )
            break
          }
        }

        for( let i in previousState.coursePeople )
        {
          if( previousState.coursePeople[i] === someone )
          {
            previousState.coursePeople[i].isTagged = false
            break
          }
        }

        console.log("STATE.TAGGEDPEOPLE:")
        console.log(previousState.taggedPeople)

        console.log("STATE.COURSEPEOPLE:")
        console.log(previousState.coursePeople)
        previousState.showedUsers = previousState.coursePeople

        return previousState
      })
    }
    else
    {

      console.log("AGREGANDO TAG ################################################################################")

      await this.setState( previousState => {
        for( let i in previousState.coursePeople )
        {
          if( previousState.coursePeople[i] === someone )
          {
            previousState.coursePeople[i].isTagged = true
            previousState.taggedPeople.push(previousState.coursePeople[i])
            break
          }
        }
        
        console.log("STATE.TAGGEDPEOPLE:")
        console.log(previousState.taggedPeople)
        console.log("STATE.COURSEPEOPLE:")
        console.log(previousState.coursePeople)
        previousState.showedUsers = previousState.coursePeople   



        return previousState
      })

    }

        this.changeReload( false )

        this.changeReload( true )
  }


  filterData( email )
  {
    email = email.toLowerCase()
    console.log( email )


    this.setState( previousState => {
      previousState.toFind = email
      return previousState
    })


    if(email === '')
    {
      this.setState( previousState => {
        previousState.showedUsers = previousState.coursePeople
        return previousState
      })
    }
    else
    {


      this.setState( previousState => {
      let options = { extract: function(el) { return el.name } }
      let results = fuzzy.filter( email, this.state.coursePeople, options)
      let matches = results.map(function(el) { return el.original; })



        previousState.showedUsers = matches
        return previousState

      }) 
    }
  }


  getCardItem( friend )
  {
      return (
      <TouchableHighlight onPress={() => this.tagSomeOne( friend ) }>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: friend.picture }} />
                  <Text> { friend.name } </Text>
                </Left>

                <Right>
                  <CheckBox color='#fd6342' checked={ friend.isTagged } onPress={ () => this.tagSomeOne( friend ) } />
                </Right>
              </CardItem>
      </TouchableHighlight>

        )        
  }




  renderToTagContent()
  {
    return(
      <Container style={{ flex: 0.75, borderRadius: 40 }}>
        <LinearGradient colors={['#fd7292', '#fd6342']} >
          <Header searchBar rounded style={{ backgroundColor: 'transparent' }}>

            <Button 
            transparent 
            onPress={() => this.props.navigation.goBack()}
            style={{ marginRight: '5%'}}>
              <Icon name="arrow-back" />
            </Button>

            <Item>
              <Icon name="ios-search" />
              <Input 
              placeholder="Buscar por nombre..." 
              value={this.state.toFind}
              onChangeText={ ( name ) => this.filterData( name ) } />
              <Icon name="ios-people" />
            </Item>
          </Header>
        </LinearGradient>


        <Content contentContainerStyle={{ borderRadius: 3, backgroundColor: 'white', flex: 1}}>
          <Card >

            { this.state.reload ?  this._renderFlatList() : null }

          </Card>
        </Content>
      </Container>
      )
  }

  _renderFlatList()
  {
    return(    
      <FlatList 
          data={ this.state.showedUsers } 
          renderItem={ ( { item } ) => this.getCardItem( item ) } />
          )
  }


  renderErrorContent()
  {
    return(
                    <Container style={{ flex: 0.5, borderRadius: 40 }}>

                    <LinearGradient colors={['#fd7292', '#fd6342']} >
                      <Header style={{ backgroundColor: 'transparent' }}>

                        <Left>
                        </Left>

                        <Body>
                          <Title style={{ color: 'white' }}> Error </Title>
                        </Body>
    
                        <Right>
                        </Right>                    
                      </Header>
                    </LinearGradient>

                      <Content contentContainerStyle={{ borderRadius: 3, backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>
                          ¡ Recuerda rellenar todos los campos necesarios !
                        </Text>

                          <TouchableOpacity style={styles.touchable} onPress={() => this.setState({ isModalVisible: false })}>
                            <LinearGradient colors={['#fd7292', '#fd6342']} style={styles.gradient} >
                              <Text style={styles.buttonText} >
                                 Cerrar
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>

                      </Content>
                    </Container>

      )
  }


  _renderTaggedPeopleList()
  {
    return(
      <FlatList 
       data={ this.state.taggedPeople } 
       renderItem={ ( { item } ) => <Thumbnail source={{uri: item.picture }} />} /> 

      )
  }


  _renderOption( item )
  {
    return(
           <TouchableOpacity onPress={item.func} style={styles.containerIcon}>
              <Image source={item.key} />
            </TouchableOpacity>
             )
  }

  renderContent()
  {
    if( this.state.loading )
    {
      return (
          <Content style={{ backgroundColor: 'white'}} >
            <Spinner color='#fd6342' />
          </Content>
        )
    }
    else
    {
      return( 

          <Content style={{ backgroundColor: 'white'}} >

          <Image source={require('./img/activityDescription.png')} style={{ resizeMode: 'contain', marginLeft: 10, marginTop: 10}} />


                <Form>
                  <Item floatingLabel >
                    <Label>
                      <Icon name='md-create' style={ styles.iconInput } />
                      Mi actividad
                    </Label>
                    <Input onChangeText={ ( value ) => this.changeName( value ) } value={this.state.newActivity.name}/>
                  </Item>

                  <Item floatingLabel >
                    <Label>
                      <Icon name='ios-text' style={ styles.iconInput } />
                      Mi descripción
                    </Label>
                    <Input onChangeText={ ( value ) => this.changeDescription( value ) } value={this.state.newActivity.description}/>
                  </Item>
                </Form>


            <Grid>

              <Row style={{ marginTop: 15 }} >
                  <Text> Etiquetas: </Text>
                  { this.state.reload ? this._renderTaggedPeopleList() : null }
              </Row>

              <Row style={{ marginTop: 15 }}>
                <FlatList contentContainerStyle={styles.listContainer} data={ this.state.data }
                      renderItem={({item}) => this._renderOption( item ) }/>
              </Row>
            </Grid>  

                <TouchableOpacity style={styles.touchable} onPress={this._publishActivity}>
                  <LinearGradient colors={['#fd7292', '#fd6342']} style={styles.gradient} >
                    <Text style={styles.buttonText} >
                      Publicar
                    </Text>
                  </LinearGradient>
                </TouchableOpacity> 

            <View>
              <Modal 
              isVisible={ this.state.isModalVisible }
              onBackdropPress={() => this.setState({ isModalVisible: false })}>
              { this.state.showToTag ? this.renderToTagContent() : this.renderErrorContent() }
              </Modal>
            </View>

          </Content>



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


            { this.renderContent() }



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
  },
  touchable: 
  {
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
  iconInput:
  { 
    fontSize: 20, 
    color: 'grey', 
    marginRight: 50 
  }
})


export default AddActivity;
