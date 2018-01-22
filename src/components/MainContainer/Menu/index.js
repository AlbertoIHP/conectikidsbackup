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

const extractKey = ({id}) => id;
const dim = Dimensions.get('window');
const itemWidth = dim.width / 4;


class Menu extends Component {



	// SE DEBE REDIRIGIR CON ROUTER A ADD ACTIVITY
  _onPressButton( text )
  {
    console.log(text)
    Actions.AddActivity({ text: text })
  }

  renderItem ( {item} ) 
  {
    return (
      <View style={[styles.row, styles.containerText]}>
        <TouchableOpacity key={item.id} onPress={() => this._onPressButton(item.text)}>

        <Image
          source={item.icon}
          style={{ width: 55 , height: 55}}


        />

        </TouchableOpacity>
        <Text style={{
          marginTop: 5,
          textAlign: 'center',
          color: item.color
        }}>{item.text}</Text>
      </View>
    )
  }




  render() 
  {
    return (
      <FlatList
        contentContainerStyle={ styles.container }
        data={rows}
        renderItem={ ( item ) => this.renderItem( item )}
        keyExtractor={extractKey}
      />
    )
  }
}



const styles = StyleSheet.create({
  containerText:
  {
    flex: 1,
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
    padding: 15,
    margin: 14,
    width: itemWidth,
    height: 110,
  }
})

export default Menu;
