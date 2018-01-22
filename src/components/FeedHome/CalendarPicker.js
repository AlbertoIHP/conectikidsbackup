import React, {Component} from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity,TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import Calendar from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { CardItem } from 'native-base';

export default class CalendarPicker extends React.Component {



  constructor(props){
    super(props);
    this._selectDate = this._selectDate.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      isModalVisible: false,
      selectedDate: new Date(),
      calendarDate: new Date(),
      onDateChange: this.props.onDateChange,
      weekdays: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
    }

  }

  update(newDate){
    this.setState({
      selectedDate: newDate
    })
    this.state.onDateChange(newDate);
  }

  toChileString(date){
    dayPos = (date.getDay() +6)%7;
    day = this.state.weekdays[dayPos];
    text = this.state.selectedDate.toDateString()
    return day + text.substr(3, text.length - 3)
  }

  _selectDate(date){
    this.setState({
      calendarDate: date
    })
  }

  _changeDate(){
    this.setState({
      isModalVisible: false
    })
    this.update(this.state.calendarDate);
  }

  _previousDate(){
    yesterday = this.state.selectedDate
    yesterday.setDate(yesterday.getDate() - 1)
    this.update(yesterday)
  }

  _nextDate(){
    tomorrow = this.state.selectedDate
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.update(tomorrow)
  }

  _showModal() {
    this.setState({ isModalVisible: true })
  }

  _hideModal() {
    this.setState({ isModalVisible: false })
  }

  render() {
    return (
      <CardItem>
        <Calendar
          style={{flex:8}}
          initialDate={this.state.selectedDate}
          onDateChange={this._selectDate}
          previousTitle={'Anterior'}
          nextTitle={'Siguiente'}
          weekdays={this.state.weekdays}
          months={
            ['Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
            ]}
          scaleFactor={400}
          selectedDayColor='#FD5E2C'
          startFromMonday={true}
        />
      </CardItem>
    );
  }
}


const styles = StyleSheet.create({
  dateContainer: {
    height: 40,
    alignItems: 'center',
    paddingTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingBottom: 10,
    shadowColor: '#c2c3c4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    flexDirection: 'row',
    elevation: 2
  },
  modalContainer: {
    flex: 0.7,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between'
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10
  },
  calendar: {
    flexDirection: 'column',
    paddingTop: 20,
    flex: 1
  },
  buttonContainer: {
    height: 160
  },
  headline:
  {
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontFamily: 'helvetica',
  },
  backdropView:
  {
    paddingTop: 21,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  backdrop: {
    borderRadius: 10,
    width: 280,
    height: 60
  }
});
