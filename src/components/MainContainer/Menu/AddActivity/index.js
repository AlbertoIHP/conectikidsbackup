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
  Column
} from "native-base"
import { LinearGradient } from 'expo'

class AddActivity extends Component {


  constructor(props)
  {
    super(props);
    this.state = {
    description: '',
    photoUrl: null,
    type: '',
    tags: [],
    tagsRender: [],
    loading: false
    }

    this._publishActivity = this._publishActivity.bind(this);
    this._explore = this._explore.bind(this);
    this._openCamera = this._openCamera.bind(this);
    this._tag = this._tag.bind(this);
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



  _tag()
  {
  	console.log("Aqui debe ir la logica para etiquetar personas")
    // const {navigate} = this.props.navigation;
    // navigate('TagChildren', {returnData: this.returnData.bind(this)});
  }

  _publishActivity()
  {
  	console.log("Aqui va la logica para publciar la actividad")
    // const {navigate} = this.props.navigation;
    // if (this.state.loading){
    //   alert("Se está cargando la foto o video");
    //   return
    // }
    // let userId = Auth.user().uid;
    // Database.publishActivity(userId, this.state).then(function(value){
    //   navigate('Home')
    // });
  }


  renderTags() 
  {
  	console.log("Aqui va la logica para mostrar las etiquetas ")
    // if(this.state.tagsRender)
    // {
    //   return this.state.tagsRender.map(function(tags, i){
    //     return(
    //       <GroupTag style={styles.tag} key={tags.id} text={tags.name}/>
    //     );
    //   });
    // }
  }

  onFocus()
  {
    this.setState({
      description: ''
    });
  }



  render () 
  {
    return(

        <Container style={{ backgroundColor: 'white'}} >
            <LinearGradient colors={['#fd7292', '#fd6342']} >
              <Header style={{ backgroundColor: 'transparent' }}>

                <Left>
                  <Button transparent onPress={() => Actions.reset('MainContainer') } >
                    <Icon style= {{ color: "white" }} name="arrow-back" />
                  </Button>
                </Left>

                <Body>
                  <Title style={{ color: 'white' }}> { this.props.text } </Title>
                </Body>

                <Right />
                
              </Header>
            </LinearGradient>


          <Content style={{ backgroundColor: 'white'}} >
            <View style={styles.container}>
              <Image source={require('./img/activityDescription.png')}/>
              <TextInput
                maxLength={100}
                style={[styles.textInput]}
                onFocus={() => this.onFocus()}
                multiline={true}
                numberOfLines={2}
                onChangeText={(description) => this.setState({description})}
                placeholder="Escribe algo"
                value={this.state.description}/>
                <ScrollView style={styles.containerTags} horizontal={true} showsVerticalScrollIndicator={false}>
                  {this.renderTags()}
                </ScrollView>

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
            </View>
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
