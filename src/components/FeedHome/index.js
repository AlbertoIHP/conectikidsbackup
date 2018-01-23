import React, {Component} from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions  } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EventEmitter from "react-native-eventemitter"
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  Icon,
  Text,
  Fab,
  Drawer,
  List,
  Badge,
  ListItem,
  Grid,
  Row,
  Column
} from "native-base"

//import Post from './Post'
import CalendarPicker from './CalendarPicker'
import { activityService } from '../../services/Activity.service'
import { socket } from '../../services/socket'

const dim = Dimensions.get('window');

class FeedHome extends Component {

  constructor(props)
  {
    super(props)
    this.setModalVisible = this.setModalVisible.bind(this)
    this._onDateChange = this._onDateChange.bind(this)
    this.openComments = this.openComments.bind(this)

    today = this.getStartDay(new Date())
    activities = []
    activities[today.getTime()] = []
    selected = activities[today.getTime()]

    this.state = {
      activities: activities,
      selectedActivities: selected,
      selectedDate: today,
      modalVisible: true,
      loading: false,
    }
    this.getActivities(today)


  }

  refreshActivities( idCourse, token )
  {
      activityService.getActivitiesByCourseId( idCourse, token ).then( ( response ) => {
        this.changeActivities( response.data.courseActivities )
      }).catch( ( error ) => {
        console.log( error )
      })
  }


  componentDidMount()
  {

    if( this.props.selectedCourse && this.props.token )
    {
      this.refreshActivities( this.props.selectedCourse, this.props.token )
    }


    socket.on('activityAdded', ( activity ) => {
      activity = JSON.parse( activity )
      console.log("ESCUCHE EL EVENTO DE AÑADIR ACTIVIDAD")
      if( activity.course_id === this.props.selectedCourse )
      {
        this.refreshActivities( this.props.selectedCourse, this.props.token )
      }
      else
      {
        console.log("Lo escuche, pero no tengo nada que ver con esa actividad, soy otro curos")
      }

    })


    EventEmitter.on("userHasChangedCourseID", ( idCourse, token ) => {
      //AQUI SE DEBE DE HACER EL FETCH PARA OBTENER TODAS LAS HISTORIAS DE LA ID DEL CURSO ENTREGADA
      this.refreshActivities( idCourse, token )

    })
  }

  changeActivities( activities )
  {
    this.setState( previousState => {
      previousState.activities = activities
      console.log(activities)
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

  getEndDay(date)
  {
    newDate = new Date(date.getTime())
    newDate.setHours(23)
    newDate.setMinutes(59)
    newDate.setSeconds(59)
    return newDate
  }

  _onDateChange(date)
  {
    this.setState({
      loading: true,
    })
    newDate =  this.getStartDay(date)
    select = this.state.activities[newDate.getTime()]
    if (!select)
    {
      activities = this.state.activities
      activities[newDate.getTime()] = []
      this.setState({
        activities: activities,
        loading:false,
      },
        () =>{
          select = this.state.activities[newDate.getTime()]
          this.setState({
            loading: false,
            selectedDate: newDate,
            selectedActivities: select,
          }, () => this.getActivities(newDate))
        }
      )
    } 
    else 
    {
      this.setState({
        selectedDate: newDate,
        selectedActivities: select,
        loading: false,
      })
    }
  }

  setModalVisible(visible) 
  {
    this.setState( { modalVisible: visible } );
  }

  get_user()
  {
    let user = Auth.user();
    return user.displayName;
  }


  //Funciones copiadas y pegadas deben ser modificadas
  openComments( activityId, comments )
  {

  }

  getActivities( date )
  {

  }

  _renderContent()
  {
    if( this.state.activities.length <= 0 )
    {
      return (
        <Text> No hay actividades que mostrar</Text>
        )
    }

    return(
        <List dataArray={ this.state.activities } renderRow={data => 
          <ListItem button noBorder onPress={() => console.log(data.name) }>
           <Left>
             <Text>
               {data.name}
              </Text>
                    </Left>
        </ListItem>}/>
      )

  }

  render()
  {

    
    if(this.state.loading){
      return(
        <CustomSpinner/>
      )
    }
    return (

      <View style={styles.container}>
        <View style={{height: 30}}></View>
          <CalendarPicker onDateChange={this._onDateChange}/>
        <View style={{height: 10}}></View>

        <View>
          { this._renderContent() }

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  button: {
    marginTop: 20,
  }
})

export default FeedHome;
