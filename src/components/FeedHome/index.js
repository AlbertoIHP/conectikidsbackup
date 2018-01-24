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

import Post from './Post';
import CalendarPicker from './CalendarPicker'
import { activityService } from '../../services/Activity.service'
import moment from 'moment';
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
      activities: [],
      selectedActivities: selected,
      selectedDate: today,
      modalVisible: true,
      loading: false,
    }
    this.getActivities(today)


  }

  refreshActivities( idCourse, token, date )
  {
      activityService.getActivitiesByCourseIdAndDate( idCourse, token, date ).then( ( response ) => {
        this.changeActivities( response.data.fileteredActivities )
      }).catch( ( error ) => {
        console.log( error )
      })
  }


  componentDidMount()
  {

    if( this.props.selectedCourse && this.props.token )
    {
      this.refreshActivities( this.props.selectedCourse, this.props.token, moment(new Date()).format('YYYY-MM-DD'))
    }


    socket.on('activityAdded', ( activity ) => {
      activity = JSON.parse(activity)

      if( this.props.selectedCourse === activity.course_id )
      {
      this.refreshActivities( this.props.selectedCourse, this.props.token, moment(new Date()).format('YYYY-MM-DD'))
      }
      else
      {
        console.log("ESCUCHE EL EVENTO, PERO NO TENGO NADA QUE VER CON ESE CURSO")
      }


    })

    EventEmitter.on("userHasChangedCourseID", ( idCourse, token, date ) => {
      //AQUI SE DEBE DE HACER EL FETCH PARA OBTENER TODAS LAS HISTORIAS DE LA ID DEL CURSO ENTREGADA
      this.refreshActivities( idCourse, token, moment(new Date()).format('YYYY-MM-DD'))

    })
  }

  changeActivities( activities )
  {
    this.setState( previousState => {
      previousState.activities = activities
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
    this.refreshActivities( this.props.selectedCourse, this.props.token, moment(date).format('YYYY-MM-DD'))
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
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <Text> No hay actividades para mostrar </Text>
          </View>
        )
    }

    return(
        <List dataArray={ this.state.activities } renderRow={data =>
          <ListItem button noBorder onPress={() => console.log(data.name) }>
            <Post activity={data} token={this.props.token}/>
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
