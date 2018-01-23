import React, {Component} from 'react';
import {TextArea, StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import Comment from './components/comment';

const dim = Dimensions.get('window');


class Comments extends React.Component {
    static navigationOptions = {
      title: 'Comentarios',
    }

    constructor(props) {
        super(props);
        let params = props.navigation.state.params;
        this._onSend = this._onSend.bind(this)
        console.log('inside', params);
        this.state = {
            aid: params.activityId,
            comments: params.comments
        }
    }

    _onSend(text) {
        // Database.writeComment(this.state.aid, text)
        // .then(this.props.navigation.goBack())
        // .catch((error) => console.log(error));
    }

    render() {
        return(
            <View style={styles.parentContainer}>
            <View style={{height: 10}}/>
            <View
            style={{height: dim.height-210}}
            contentContainerStyle={styles.itemsBottom}
            parentStyle={{paddingTop: -150}}
            scrollEnabled = {true}
            bottomStart= {true}
            scrollToEnd={true}
            >
            {
                this.state.comments &&
                Object.values(this.state.comments).map((prop, key) => {
                    return (
                        <Comment info={prop} text={prop.text} />
                    );
                })
            }
            </View>
              <TouchableOpacity style={styles.touchable} onPress={() => this._onSend()}>
                <LinearGradient colors={['#fd7292', '#fd6342']} style={styles.gradient} >
                  <Text style={styles.buttonText} >
                    upload
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
        )
    }
}
export default Comments;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'space-between',
    backgroundColor: '#f4f6f7'
  },
  itemsBottom: {
    flexDirection:'column',
    justifyContent: 'flex-end'
  }
})
