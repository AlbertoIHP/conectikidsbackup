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
  CameraRoll,
  Platform,
  Picker
} from 'react-native'
import { Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import CalendarPicker from '../../FeedHome/CalendarPicker'
import { LinearGradient } from 'expo'
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
import { taskService } from '../../../services/Task.service'

import { socket } from '../../../services/socket'
import Modal from 'react-native-modal'
class AddTask extends Component {


  constructor(props)
  {
    super(props)

    this.state = {
      newTask: {
      name: '',
        description: '',
        hour: '00',
        minute: '00' ,
        selectedDate: (today.toISOString()).slice(0,10),
        course_id: this.props.text.selectedCourse,
        createdBy_id: this.props.text.user.id
      },
      loading: false,
      isModalVisible: false
    }

    console.log("DEBUGGING AGENDAHOME")
    console.log(this.state)

    hours = []
    minutes = []

    for( let i = 0 ; i <= 23 ; i++ )
    {
      i >= 0 && i <=9 ? hours.push( '0'+i.toString() ) : hours.push( i.toString() )      
    }

    for( let i = 0 ; i <= 59 ; i++ )
    {
      i >= 0 && i <=9 ? minutes.push( '0'+i.toString() ) : minutes.push( i.toString() )  
    }



    this.changeName = this.changeName.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this._publishTask = this._publishTask.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this.toggleSpinner = props.spinner;
  }





  renderItem( action )
  {



    items = []

    if( action === 'hour')
    {
      for ( let item of hours )
      {
        items.push(<Picker.Item label={item} value={item} /> )
      }      
    }
    else
    {
      for ( let item of minutes )
      {
        items.push(<Picker.Item label={item} value={item} /> )
      }         
    }





    return items
  }



  changeName(text)
  {
    this.setState( previousState => {
      previousState.newTask.name = text
      return previousState
    })
  }



  changeDescription(text)
  {
    this.setState( previousState => {
      previousState.newTask.description = text
      return previousState
    })
  }


  _publishTask()
  {



  	console.log("Aqui deber ir la logica para publicar la tarea")

    if( this.state.newTask.name === '' || this.state.newTask.description === '')
    {
      console.log("Deben llenarse los campos")
      this.changeModal( true )
    }
    else
    {
      this.changeLoading( true )

      let newTask = {
        name: this.state.newTask.name.name,
        description: this.state.newTask.description.description,
        timeof: this.state.newTask.hour+':'+this.state.newTask.minute,
        selectedDate: this.state.newTask.selectedDate,
        course_id: this.state.newTask.course_id,
        createdBy_id: this.state.newTask.createdBy_id
      }

      taskService.store( newTask ).then( ( response ) => {
        //EMISION DEL EVENTO
        socket.emit('taskAdded', JSON.stringify(newTask) )
        
        Actions.pop()
        this.changeLoading( false )
      }).catch( ( error ) => {
        console.log( error )
        this.changeLoading( false )
      })

    }


  }


  changeLoading( state )
  {
    this.setState( previousState => {
      previousState.loading = state
      return previousState
    })
  }


  getStartDay(date)
  {
    newDate = new Date(date.getTime())
    newDate.setHours(0)
    newDate.setMinutes(0)
    newDate.setSeconds(0)
    newDate.setMilliseconds(0)
    return newDate
  }



  _onDateChange(date)
  {
    console.log(date);
    newDate =  this.getStartDay(date)

    this.setState( previousState => {
      previousState.newTask.selectedDate =(newDate.toISOString()).slice(0,10)
      return previousState
    })
  }


  changeModal( state )
  {
    this.setState( previousState => {
      previousState.isModalVisible = state
      return previousState
    })
  }



  changeHour( value )
  {
    this.setState( previousState => {
      previousState.newTask.hour = value

      return previousState
    })
  }




  changeMinute( value )
  {
    this.setState( previousState => {
      previousState.newTask.minute = value


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
      return (
            <View style={styles.container}>

              <CalendarPicker onDateChange={this._onDateChange}/>
              
            <View style={{ marginTop: 25, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Picker
              selectedValue={ this.state.newTask.hour } 
              style={{ width: '45%'}} 
              onValueChange={(itemValue, itemIndex) => this.changeHour( itemValue )} >
                { this.renderItem('hour') }
              </Picker>

              <Text style={{ marginTop: 15}} >:</Text>

              <Picker
              selectedValue={ this.state.newTask.minute }  
              style={{ width: '45%'}}  
              onValueChange={(itemValue, itemIndex) => this.changeMinute( itemValue )} >
                { this.renderItem('minute') }
              </Picker>
            </View>

              <TextInput
                maxLength={100}
                style={[styles.textInput]}
                onFocus={() => this.onNameFocus()}
                multiline={true}
                numberOfLines={2}
                onChangeText={(name) => this.changeName({name})}
                placeholder="Nombre"
                value={this.state.newTask.name}/>


              <TextInput
                maxLength={100}
                style={[styles.textInput]}
                onFocus={() => this.onDescriptionFocus()}
                multiline={true}
                numberOfLines={2}
                onChangeText={(description) => this.changeDescription({description})}
                placeholder="Descripción"
                value={this.state.newTask.description}/>

              <TouchableOpacity onPress={this._publishTask} style={styles.button}>
                <Image source={require('./img/publicar.png')}/>
              </TouchableOpacity>
            </View>  
        )    
    }
  }

  onDescriptionFocus()
  {
    this.setState(previousState => {
    	previousState.description = ''
    	return previousState
    });
  }


  onNameFocus()
  {
    this.setState(previousState => {
    	previousState.name = ''
    	return previousState
    });
  }

  render() 
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
                  <Title style={{ color: 'white' }}> Agregar Tarea </Title>
                </Body>          

                <Right/>
              </Header>
            </LinearGradient>


          <Content style={{ backgroundColor: 'white'}} >
            { this.renderContent() }
              <View>

                  <Modal 
                  isVisible={ this.state.isModalVisible }
                  onBackdropPress={() => this.setState({ isModalVisible: false })}>
                    <Container style={{ flex: 0.3, borderRadius: 40 }}>

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
                  </Modal>
              </View>
          </Content>

        </Container>
    )





  }
}


export const styles = StyleSheet.create({
  button: 
  {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1
  },
  imageForm:
  {
    flex:1,
    height: undefined,
    width: undefined,
  },
  text: 
  {
    marginTop: 104,
    alignItems: 'center',
  },
  inputLogin:
  {
    margin: 10,
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
    height: '30%',
    width: '70%'
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
  }
});




export default AddTask;
