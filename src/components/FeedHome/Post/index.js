import React, {Component} from 'react';
import {TextArea, StyleSheet, View,TouchableOpacity, Modal, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Image from 'react-native-image-progress';
// import RNFetchBlob from 'react-native-fetch-blob';
import moment from 'moment';
import { commentService } from '../../../services/Comment.service'
import { userServices } from '../../../services/User.service'
import { Actions } from 'react-native-router-flux';
import { Grid, Column, Row, Thumbnail, ListItem, Body, Left, Right, Card, CardItem, Button, Text, List, Label } from 'native-base'



const deviceWidth = Dimensions.get("window").width;

import Comments from './comments';

class Post extends React.Component {

	constructor(props){
		super(props);

		this._onPressLike = this._onPressLike.bind(this)
        this._openComments = this._openComments.bind(this);

		date = new Date(props.activity.createdAt);
		time = "Hace mucho tiempo"
		difMs = (new Date()).getTime() - props.activity.createdAt;
		time = moment(date).locale("es").fromNow();

		comments: []
    var re = /(?:\.([^.]+))?$/;
    let type = re.exec(this.props.activity.photoUrl)[1];

		this.state = {
			comments: [],
			time: time,
			liked: false,
			userPhoto: require('./img/default-profile.png'),
            path: null,
            type: type,
            commentsVisible: false,
            activity: this.props.activity,
            isTagsLoaded: false
		}

        var me = this;

	}

	componentWillMount() 
	{
		this.getComments(this.props.activity.id);
	}

	async componentDidMount()
	{
		

		for( let i in this.state.activity.tags )
		{
			await userServices.show( this.state.activity.tags[i].tagged_id, this.props.token ).then( ( response ) => {
				this.setState( previousState => {
					previousState.activity.tags[i].tagged_id = response.data
					return previousState
				})

			}).catch( ( error ) =>{
				console.log( error )
			})
		}




			this.setState( previousState => {
				previousState.activity.tags.length > 0 ? previousState.isTagsLoaded = true : previousState.isTagsLoaded = false				
				return previousState
			})




	}

	getComments(idActivity) {
		commentService.getCommentsFromActivity(idActivity, this.props.token)
		.then((response) => { this.changeComments(response.data.activityComments) })
		.catch((error) => console.log(error))
	}


	changeComments (comments){
		this.setState( previousState => {

			previousState.comments = comments
			return previousState
		})
	}

	_onPressLike() {
		this.setState({
			liked: !this.state.liked
		})
	}

    _openComments() {
			Actions.Comments({ token: this.props.token , activityId: this.state.activity.id, selectedCourse: this.props.selectedCourse, user: this.props.user })
    }

    renderListItem( data )
    {
    	console.log("Tags")
    	console.log(data)
    	return(
    		<View>
				<Thumbnail small source={{ uri: data.tagged_id.picture }}/> 
				<Text note> { data.tagged_id.name }</Text>
			</View>
    		)
    }



    renderTags( )
    {
    	return(
    	 <View>
    	 <Text note> Con: </Text>
		 <List dataArray={ this.state.activity.tags } renderRow={ (data) => this.renderListItem( data )} />
    	</View>
    	)
    }

	render(){

		return (
              <ListItem avatar>
		          <Card style={styles.mb}>
		            <CardItem bordered>
		              <Left>
		                <Thumbnail small source={{ uri: this.state.activity.createdBy_id.picture }}/>
		                <Body>
		                  <Text>{ this.state.activity.createdBy_id.name } </Text>
		                  <Text note>{ this.state.activity.createdAt.split('T')[0] } - { this.state.activity.activityType } </Text>
		                </Body>
		              </Left>
		            </CardItem>

		            <CardItem>
		              <Body>
		                <Image
		                  style={{
		                    alignSelf: "center",
		                    height: 150,
		                    resizeMode: "cover",
		                    width: deviceWidth / 1.18,
		                    marginVertical: 5
		                  }}
		                  source={{ uri: this.state.activity.urlPhoto }}
		                />
		                <Text>
		                 { this.state.activity.name } : {this.state.activity.description}
		                </Text>
		              </Body>
		            </CardItem>

		            <CardItem style={{ paddingVertical: 0 }}>

						{ this.state.isTagsLoaded ? this.renderTags() : null}
		            </CardItem>

		            <CardItem style={{ paddingVertical: 0 }}>
		              <Left>
			 			<TouchableOpacity
			 				style={bottom.likeTouch}
			 				activeOpacity={0.6}
			 				onPress={this._onPressLike}>
			 			<View style={bottom.likeContainer}>
							{
			 					(this.state.liked) &&
			 					<Icon name="heart" style={[bottom.likeIcon, {color: "#F25634"}]} size={20}/>
			 				}
			 				{
			 					(!this.state.liked) &&
			 					<Icon name="heart-o" style={bottom.likeIcon} size={20}/>
			 				}
			         		<Text style={bottom.likeText}>Me gusta</Text>
			         	</View>
			         	</TouchableOpacity>
		              </Left>

		              <Right>
		                 <TouchableOpacity
                             style={bottom.commentContainer}
                             activeOpacity={0.6}
                             onPress={this._openComments}>
			         		<Icon name="comment-o" style={bottom.commentIcon} size={20}/>
			         		<Text style={bottom.comments}>Comentarios</Text>
                         </TouchableOpacity>
		              </Right>
		            </CardItem>
		          </Card>
              </ListItem>
		);
	}
}

Post.defaultProps = {
	timeAgo: "Recientemente"
}

const styles = StyleSheet.create({
  parentContainer: {
		borderRadius: 10,
		...Platform.select({
			ios: {zIndex: 2},
			android: { elevation: 2}
		}),
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		marginBottom: 10,
  		flexDirection:'row'
  },
  container: {
    flex: 8,
    flexDirection:'column',
    paddingTop:20,
    borderRadius: 10,
    shadowColor: '#c2c3c4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  mb: {
    marginBottom: 15,
    marginRight: 15
  },
  line: {
  	paddingTop: 10,
  	marginRight: 20,
 	marginLeft: 20,
    borderBottomColor: '#C9C8C8',
    borderBottomWidth: 1,
  }
})

const top = StyleSheet.create({
  container: {
  	marginLeft: 20,
  	marginRight: 20,
  	marginBottom: 20,
		borderRadius: 10,
  	height: 60,
  	flexDirection: 'row'
  },
  imageContainer: {
  	flex: 1,
  	width: 50,
  	height: 50,
  	marginRight: 10,
  	borderRadius: 10
  },
  image: {
  	flex: 1,
  	width: 50,
  	height: 50,
    resizeMode: 'contain'
  },
  midContainer: {
  	flex: 4.5,
  	flexDirection: 'column',
  	paddingTop: 5
  },
  name: {
  	flex: 1,
  	fontSize: 17
  },
  timeContainer: {
  	flex: 1,
  	flexDirection:'row'
  },
  clock: {
  	flex: 1,
  	color: "#4E5969"
  },
  timeAgo: {
  	flex: 9,
  	color: '#636C7B'
  }
})

const mid = StyleSheet.create({
	container: {
		marginLeft: 20,
	  	marginRight: 20,
	  	paddingBottom: 10
	},
	description: {
		color: "#4E5969"
	},
    backgroundVideo: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
})

const bottom = StyleSheet.create({
	container: {
		marginLeft: 20,
	  	marginRight: 20,
	  	height: 50,
	  	flexDirection: 'row',
	  	paddingTop: 10
	},
	likeTouch: {
		flex: 1.5
	},
	likeContainer: {
		flexDirection: 'row'
	},
	likeIcon: {
		flex: 0.8,
		color: '#4E5969',
		paddingTop: 3
	},
	likeText: {
		flex: 3,
		color: '#4E5969',
		paddingTop: 5
	},
	commentContainer: {
		flex: 2,
  		flexDirection:'row'
	},
	commentIcon: {
		flex: 0.8,
		color: '#4E5969',
		paddingTop: 2
	},
	comments: {
		flex: 4,
		color: '#4E5969',
		paddingTop: 5
	}

})

export default Post;
