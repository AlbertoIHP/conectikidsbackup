import React, {Component} from 'react';
import {TextArea, StyleSheet, View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Image from 'react-native-image-progress';
// import RNFetchBlob from 'react-native-fetch-blob';
import moment from 'moment';

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

    var re = /(?:\.([^.]+))?$/;
    let type = re.exec(this.props.activity.photoUrl)[1];

		this.state = {
			time: time,
			liked: false,
			userPhoto: require('./img/default-profile.png'),
            path: null,
            type: type,
            commentsVisible: false,
		}

        var me = this;

        // if (type == "MOV")
        // RNFetchBlob
        //   .config({
        //     fileCache : true,
        //     // by adding this option, the temp files will have a file extension
        //     appendExt : type
        //   })
        //   .fetch('GET', this.props.activity.photoUrl, {
        //     //some headers ..
        //   })
        //   .then((res) => {
        //     // the temp file path with file extension png
        //     // Beware that when using a file path as Image source on Android,
        //     // you must prepend "file://"" before the file path
        //     me.setState({
        //         path: res.path()
        //     })
        //   })

	}

	_onPressLike() {
		this.setState({
			liked: !this.state.liked
		})
	}

    _openComments() {
        /*this.setState({
            commentsVisible: true
        })*/
        this.props.onComments(this.props.activity.aid, this.props.activity.comments);
    }

	render(){

		return (
			<View style={styles.parentContainer}>
				<View style={{flex: 0.5}}></View>
				<View style = {styles.container}>
					<View style={top.container}>
						<View style={top.imageContainer}>
							{
								(this.props.activity.creator && this.props.activity.creator.photoUrl) &&
								<Image
								  style={top.image}
						      	  source={{uri: this.props.activity.creator.photoUrl}}
						        />
					    	}
							{
								(!this.props.activity.creator || !this.props.activity.creator.photoUrl) &&
								<Image
								  style={top.image}
						          source={this.state.userPhoto}
						        />
					    	}
				        </View>
				        <View style={top.midContainer}>
				        	{
				        		(this.props.activity.creator) &&
				        		<Text style={top.name}>{this.props.activity.creator.displayName}</Text>
				        	}
				        	{
				        		(!this.props.activity.creator) &&
				        		<Text style={top.name}></Text>
				        	}
				        	<View style={top.timeContainer}>
				        		<EvilIcon name="clock" style={top.clock} size={20}/>
				        		<Text style={top.timeAgo}>{this.state.time}</Text>
				        	</View>
				        </View>
			        </View>
			        <View style={mid.container}>
						<Text style={mid.description}>{this.props.activity.description}</Text>
					</View>
					{(this.props.activity.photoUrl && this.state.type != "MOV") &&
					<Image
			          style={{height: 150}}
			          source={{uri: this.props.activity.photoUrl}}
			        />
			    	}
                    {
                        (this.state.type == "MOV" && this.state.path) &&
                        <VideoPlayer
                          video={{ uri: this.state.path }}
                        />
                    }
					<View
					  style={styles.line}
					/>
					<View style={bottom.container}>
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
                        <TouchableOpacity
                            style={bottom.commentContainer}
                            activeOpacity={0.6}
                            onPress={this._openComments}>
			        		<Icon name="comment-o" style={bottom.commentIcon} size={20}/>
			        		<Text style={bottom.comments}>Comentarios</Text>
                        </TouchableOpacity>
					</View>
				</View>
				<View style={{flex: 0.5}}></View>
                {
                    this.state.commentsVisible &&
                    <Modal visible={this.state.commentsVisible}>
                        <Comments
                            onClose={() => this.setState({
                            commentsVisible: false
                        })}
                            activityId={this.props.activity.aid}
                            comments={this.props.activity.comments}
                        />
                    </Modal>
                }
			</View>
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