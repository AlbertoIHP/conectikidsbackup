import React, { Component } from 'react'
import { 
	FlatList, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	View, 
	Dimensions, 
	Image} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { createIconSetFromFontello } from 'react-native-vector-icons'
const rows = [
  {id: 0, text: 'Felicita', icon: require('./img/felicitacion.png'), color: '#3F51B5'},
  {id: 1, text: 'Llamada de atencion', icon: require('./img/atencion2.png'), color: '#66BB6A'},
  {id: 2, text: 'Comida', icon: require('./img/comida2.png'), color: '#7E57C2'},
  {id: 3, text: 'Siesta', icon: require('./img/siesta2.png'), color: '#00838F'},
  {id: 4, text: 'Juegos', icon: require('./img/juegos.png'), color: '#66BB6A'},
  {id: 5, text: 'Baño', icon: require('./img/baño.png'), color: '#C0CA33'},
  {id: 6, text: 'Remedio', icon: require('./img/remedio.png'), color: '#EC407A'},
  {id: 7, text: 'Lesión', icon: require('./img/band-aid.png'), color: '#FF5722'},
  {id: 8, text: 'Notas', icon: require('./img/obs.png'), color: '#66BB6A'},
]

const extractKey = ({id}) => id
const dim = Dimensions.get('window')
const itemWidth = dim.width / 4
import { Grid, Row } from 'native-base'


class Menu extends Component {



	// SE DEBE REDIRIGIR CON ROUTER A ADD ACTIVITY
  _onPressButton( text )
  {
    console.log(text)
    Actions.AddActivity({ text: {user: this.props.user, selectedCourse: this.props.selectedCourse, token: this.props.token, activityType: text } })
  }






  render() 
  {
    return (
      <Grid>
        <Row>
          <View style={[styles.row, styles.containerText]}>
            <TouchableOpacity key={rows[0].id} onPress={() => this._onPressButton(rows[0].text)}>
             <Image source={rows[0].icon} style={{ width: 55 , height: 55}} />
            </TouchableOpacity>

            <Text style={{ marginTop: 5,  textAlign: 'center',  color: rows[0].color}}>
              {rows[0].text}
            </Text>
          </View>

          <View style={[styles.row, styles.containerText]}>
            <TouchableOpacity key={rows[1].id} onPress={() => this._onPressButton(rows[1].text)}>
             <Image source={rows[1].icon} style={{ width: 55 , height: 55}} />
            </TouchableOpacity>

            <Text style={{ marginTop: 5,  textAlign: 'center',  color: rows[1].color}}>
              {rows[1].text}
            </Text>
          </View>

          <View style={[styles.row, styles.containerText]}>
            <TouchableOpacity key={rows[2].id} onPress={() => this._onPressButton(rows[2].text)}>
             <Image source={rows[2].icon} style={{ width: 55 , height: 55}} />
            </TouchableOpacity>

            <Text style={{ marginTop: 5,  textAlign: 'center',  color: rows[2].color}}>
              {rows[2].text}
            </Text>
          </View>

        </Row>

        <Row>
          <View style={[styles.row, styles.containerText]}>
            <TouchableOpacity key={rows[3].id} onPress={() => this._onPressButton(rows[3].text)}>
             <Image source={rows[3].icon} style={{ width: 55 , height: 55}} />
            </TouchableOpacity>

            <Text style={{ marginTop: 5,  textAlign: 'center',  color: rows[3].color}}>
              {rows[3].text}
            </Text>
          </View>

          <View style={[styles.row, styles.containerText]}>
            <TouchableOpacity key={rows[4].id} onPress={() => this._onPressButton(rows[4].text)}>
             <Image source={rows[4].icon} style={{ width: 55 , height: 55}} />
            </TouchableOpacity>

            <Text style={{ marginTop: 5,  textAlign: 'center',  color: rows[4].color}}>
              {rows[4].text}
            </Text>
          </View>

          <View style={[styles.row, styles.containerText]}>
            <TouchableOpacity key={rows[5].id} onPress={() => this._onPressButton(rows[5].text)}>
             <Image source={rows[5].icon} style={{ width: 55 , height: 55}} />
            </TouchableOpacity>

            <Text style={{ marginTop: 5,  textAlign: 'center',  color: rows[5].color}}>
              {rows[5].text}
            </Text>
          </View>

        </Row>

        <Row>
          <View style={[styles.row, styles.containerText]}>
            <TouchableOpacity key={rows[6].id} onPress={() => this._onPressButton(rows[6].text)}>
             <Image source={rows[6].icon} style={{ width: 55 , height: 55}} />
            </TouchableOpacity>

            <Text style={{ marginTop: 5,  textAlign: 'center',  color: rows[6].color}}>
              {rows[6].text}
            </Text>
          </View>

          <View style={[styles.row, styles.containerText]}>
            <TouchableOpacity key={rows[7].id} onPress={() => this._onPressButton(rows[7].text)}>
             <Image source={rows[7].icon} style={{ width: 55 , height: 55}} />
            </TouchableOpacity>

            <Text style={{ marginTop: 5,  textAlign: 'center',  color: rows[7].color}}>
              {rows[7].text}
            </Text>
          </View>

          <View style={[styles.row, styles.containerText]}>
            <TouchableOpacity key={rows[8].id} onPress={() => this._onPressButton(rows[8].text)}>
             <Image source={rows[8].icon} style={{ width: 55 , height: 55}} />
            </TouchableOpacity>

            <Text style={{ marginTop: 5,  textAlign: 'center',  color: rows[8].color}}>
              {rows[8].text}
            </Text>
          </View>

        </Row>

      </Grid>
    )
  }
}



const styles = StyleSheet.create({
  containerText:
  {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  container: 
  {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  row: 
  {
    padding: 10,
    margin: 14,
    width: itemWidth,
    height: 110,
  }
})

export default Menu;
