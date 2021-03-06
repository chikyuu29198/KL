import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../../Assets/Images';
import Constants from './Constants';
import {ImageButton} from 'react-native-image-button-text';
import { StackNavigator } from 'react-navigation';
import store from '../../redux/store';
import Sound from 'react-native-sound';
Sound.setCategory('Ambient')

const backgroundSound = new Sound(require('../../Assets/sounds/punchMouseSound.mp3'),
    (error, sound) => {
    if (error) {
      console.log("Can not load background sound")
      return;
    }
    backgroundSound.setNumberOfLoops(-1)
    })    


class SettingBar extends Component {
    constructor(props){
        super(props);
        this.state = {
          isMute: !store.getState().soundStatus,
        }
      }
      
    changeSoundIcon(){
      store.dispatch({type: 'UPDATE_SOUND'})
      this.setState({
          isMute: !this.state.isMute
      })
      if (this.state.isMute){
        backgroundSound.play()
      }
      else {
        backgroundSound.stop()
      }
        
    }
    exitPress(){
      // {this.props.navigation.navigate('Home')}
      Alert.alert(
        //title
        'Exit Game!',
        //body
        'Are you sure you want to exit ?',
        [
          {text: 'Yes', onPress: () => {this.props.navigation.navigate('PunchMouseLevel')}},
          {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    }

    UNSAFE_componentWillMount(){
      if (this.state.isMute == false)
      backgroundSound.play();
      // backgroundSound.stop();
    }
    componentWillUnmount(){
      backgroundSound.stop();
    }
  render() {
    return (
      <View style={styles.settingBar}>
        <ImageButton  
          width={30} 
          height={30} 
          text= "" 
          onPress={this.changeSoundIcon.bind(this)}
          source={ this.state.isMute ?
                    Images.mute : 
                    Images.speaker}/>
        <ImageButton
          width = {30}
          height = {30}
          paddingLeft = {20}
          text = ""
          onPress={this.exitPress.bind(this)}
          source = { Images.exit}
        
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    settingBar: {
      position: "absolute",
      top: 8,
      width: 50,
      height: 20,
      left: Constants.MAX_WIDTH -60,
      alignContent: 'center',
      justifyContent: 'center',
      // backgroundColor: 'black',
      // opacity: 0.5,
      flexDirection: 'row'

      
    },
    touchable: {
      opacity: 0.5,
      width: 20,
      height: 20,
    }
  });
export default SettingBar; 