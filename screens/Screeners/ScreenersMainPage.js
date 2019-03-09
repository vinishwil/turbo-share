import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet, TouchableOpacity
} from "react-native";
import { Header, Content, Picker, Form ,Icon} from "native-base";
import Colors from "../../constants/Colors";
import { colors } from "react-native-elements";


const indices = [
  {id: 2, key: 'OpenLow', name: 'OPEN = LOW',icon : 'ios-trending-up',color :'defaultGreen'},
  {id: 1, key: 'OpenHigh', name: 'OPEN = HIGH',icon : 'ios-trending-down',color:'defaultRed'},
];

class ScreenersMainPage extends Component {
  renderOptions() {
    return indices.map((item) => {
      return (
        <View key={item.key} style={styles.mainContainer}>
          <TouchableOpacity  style={styles.innerContainer} onPress={(props)=> this.props.navigation.navigate(item.key)}>
          <Icon name={item.icon}></Icon>
            <Text style={[styles.textContent,styles[item.color]]}>{item.name}</Text>  
          </TouchableOpacity>
        </View>

      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderOptions()}
      </View>
    );
  }
}
export default ScreenersMainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  mainContainer: {
    padding: 10,
    flex: 0.5,
  },
  innerContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  textContent:{
    // color:'#ff9900',
    fontWeight:'bold',
  },
  defaultGreen:{
    color:Colors.defaultGreen
  },
  defaultRed:{
    color:Colors.defaultRed
  }
});