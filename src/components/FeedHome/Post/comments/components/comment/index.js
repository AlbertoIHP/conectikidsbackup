import React, {Component} from 'react';
import {TextArea, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Image from 'react-native-image-progress';


class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userPhoto: require('../../../img/default-profile.png'),
        }
    }


    render() {
        return (
            <View style={styles.parentContainer}>
            <View style={styles.container}>
            <View style={{flex: 1}}>
            {
                (this.props.info.name && this.props.info.picture) &&
                <Image
                  style={styles.image}
                  source={{uri: this.props.info.picture}}
                />
            }
            {
                (!this.props.info || !this.props.info.picture) &&
                <Image
                  style={styles.image}
                  source={this.state.userPhoto}
                />
            }
            </View>
            <View style={{flex: 6}}>
            <Text>
            <Text style={{fontWeight: 'bold'}}> {this.props.info.name}</Text>
            {`: ${this.props.text}`}
            </Text>
            </View>
            </View>
            <View
              style={{
                borderBottomColor: '#a5a5a5',
                borderBottomWidth: 0.8,
                height: 20
              }}
            />
            </View>
        )
    }

}
export default Comment

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  parentContainer: {
    paddingBottom: 10
  },
    image: {
    flex: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
})
