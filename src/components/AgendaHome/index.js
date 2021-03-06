import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableHighlight, TouchableOpacity, Platform } from 'react-native'
import EventEmitter from "react-native-eventemitter"
import { taskService } from '../../services/Task.service'
import { Agenda } from 'react-native-calendars'
import { LocaleConfig } from 'react-native-calendars'
import Modal from 'react-native-modal'
import { LinearGradient } from 'expo' 
import {
  Container,
  Icon,
  Header,
  Title,
  Content,
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
LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['En.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ag.','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Miér.','Jue.','Vie.','Sáb.']
}

LocaleConfig.defaultLocale = 'es'
import { socket } from '../../services/socket'

class AgendaHome extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      items: {},
      isModalVisible: false,
      currentNameTask: '',
      currentDescriptionTask: '',
      currentTimeOfTask: '',
      tasks: [],
      showAgenda: false
    }
    this.addItem = this.addItem.bind(this)
  }

  refreshTasks( idCourse, token )
  {
      this.setState( previousState => {
        previousState.showAgenda = false
        previousState.items = {}
        return previousState
      })


      taskService.getTasksByCourseId( idCourse, token ).then( ( response ) => {
        this.changeTasks( response.data.courseTasks )
      }).catch( ( error ) => {
        console.log( error )
      })

  }

  componentDidMount()
  {

    if( this.props.selectedCourse && this.props.token )
    {
      this.refreshTasks( this.props.selectedCourse, this.props.token )
    }


    socket.on('taskAdded', ( task ) => {
      task = JSON.parse(task)
      console.log("ESCUCHE EL EVENTO DE AÑADIR TAREA!!!")
      if( this.props.selectedCourse === task.course_id)
      {
        //this.addItem( task )
        this.refreshTasks( this.props.selectedCourse, this.props.token )
      }
    })

    EventEmitter.on("userHasChangedCourseID", ( idCourse, token ) => {
      //AQUI SE DEBE DE HACER EL FETCH PARA OBTENER TODAS LAS TAREAS DE LA ID DEL CURSO ENTREGADA
      this.refreshTasks( idCourse, token )
    })


  }



  changeTasks( tasks )
  {
    this.setState( previousState => {
      previousState.tasks = tasks

      for( let task of tasks )
      {
        this.addItem(task)
      }

      console.log("debug linea 65 AgendaHome -> index.js")
      previousState.showAgenda = true
      return previousState
    })
  }



  _selectDate()
  {
    this.setState({
      calendarDate: date
    })
  }

  addItem(it)
  {
    if(this.state.items[it.selectedDate]!=null)
    {
      this.state.items[it.selectedDate].push({name: it.name, timeof: it.timeof, description: it.description});
    }
    else
    {
      this.state.items[it.selectedDate]=[{name: it.name, timeof: it.timeof, description: it.description}];
    }
  }


  loadItems(day) 
  {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) 
      {

        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!this.state.items[strTime]) 
        {
          this.state.items[strTime] = [];
          const numItems = 0;

          for (let j = 0; j < numItems; j++) 
          {
            this.state.items[strTime].push({
              name: 'iiiirem',
              height: Math.max(50, Math.floor(Math.random() * 150))
            }); 
          }
        }


      }


      const newItems = {};

      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key]
      });

      this.setState({
        items: newItems
      });
    }, 1000)

    //Sorting tasks
    Object.keys(this.state.items).forEach(key => { 
    	if( this.state.items[key].length > 0)
    	{

          this.setState( previousState => {
            let sortedTasks = previousState.items[key].sort(function(a, b){
                var nameA=a.timeof.split(':')[0].toLowerCase(), nameB=b.timeof.split(':')[0].toLowerCase()

                if (nameA < nameB) //sort string ascending
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            })

            console.log(sortedTasks)

            return previousState
          })


        }
    })

  }

  showTask( task )
  {
    console.log(task)

    this.setState( previousState => {
      previousState.currentNameTask = task.name
      previousState.currentDescriptionTask = task.description
      previousState.currentTimeOfTask = task.timeof


      previousState.isModalVisible = true
      return previousState
    })
  }

  renderItem( item ) 
  {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <TouchableOpacity onPress={ () => { this.showTask(item) } }>
          <Text>
            {item.timeof} {item.name} 
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderEmptyDate() 
  {
    return (
      <View style={styles.emptyDate}><Text></Text></View>
    )
  }

  rowHasChanged(r1, r2) 
  {
    return r1.name !== r2.name;
  }

  timeToString(time) 
  {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }


  toObject( arr )
  {
     var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;   
  }


  _renderAgenda()
  {

    if( this.state.showAgenda )
    {
      return (
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            onDayChange={(day) => {console.log('day changed')}}
            onDayPress={(day) => {console.log('day pressed')}}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            hideKnob={ false }/>    

        )
    }
    else
    {
      return(
        <Spinner color='#fd6342' />
        )
    }

  }

  render() 
  {
    return (
      <View>
        <View style={styles.container}>
            { this._renderAgenda() }    
        </View>

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
                          <Title style={{ color: 'white' }}> { this.state.currentNameTask } </Title>
                        </Body>
    
                        <Right>
                        </Right>                    
                      </Header>
                    </LinearGradient>

                      <Content contentContainerStyle={{ borderRadius: 3, backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>
                          Descripción: { this.state.currentDescriptionTask }
                        </Text>

                          <TouchableOpacity style={styles.touchable} onPress={() => this.setState({ isModalVisible: false })}>
                            <LinearGradient colors={['#fd7292', '#fd6342']} style={styles.gradient} >
                              <Text style={styles.buttonText} >
                                 Hora: { this.state.currentTimeOfTask }
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>

                      </Content>
                    </Container>
            </Modal>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    height: 1200
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 50
  },
  headline:
  {
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    justifyContent: 'center',
    marginTop: 5
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
  }
})


export default AgendaHome;
