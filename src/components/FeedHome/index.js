import React, {Component} from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons'


//import Post from './Post'
import CalendarPicker from './CalendarPicker'


const dim = Dimensions.get('window');

class FeedHome extends Component {

  constructor(props)
  {
    super(props)
    this.setModalVisible = this.setModalVisible.bind(this)
    this._onDateChange = this._onDateChange.bind(this)
    this.openComments = this.openComments.bind(this)

    today = this.getStartDay(new Date())
    activities = {}
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
          { this.state.selectedActivities.map((prop, key) => {
             return (
              <Post key={key} onComments={this.openComments} activity={prop}/>
             );
          })}
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
