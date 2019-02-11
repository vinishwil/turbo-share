import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import IntradayScreen from '../screens/IntradayScreen'
import OptionsScreen from '../screens/OptionsScreen';
import FuturesScreen from '../screens/FuturesScreen';
import { Icon } from 'expo';  
import { Left } from 'native-base';
import Colors from '../constants/Colors';

const HomeStack = createStackNavigator({
  Home: Home,
});

HomeStack.navigationOptions = {
  header:null,
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused,tintColor }) => (
    <TabBarIcon
      focused={focused}
      color = {tintColor}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />    
  ),
};

const IntradayStack = createStackNavigator({
  Intraday: IntradayScreen,
});

IntradayStack.navigationOptions = {
  tabBarLabel: 'Intraday',
  tabBarIcon: ({ focused,tintColor }) => (
    <TabBarIcon
      focused={focused}
      color = {tintColor}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-link'} 
    />
  ),
};
  
const OptionsStack = createStackNavigator({
  Options: OptionsScreen,
});

OptionsStack.navigationOptions = {
  tabBarLabel: 'Options',
  tabBarIcon: ({ focused,tintColor }) => (
    <TabBarIcon
      focused={focused}
      color = {tintColor}
      name={Platform.OS === 'ios' ? 'ios-briefcase' : 'md-options'}
    />
  ),
};

const FuturesStack = createStackNavigator({
  Futures: FuturesScreen,
});

FuturesStack.navigationOptions = {
  tabBarLabel: 'Futures',
  tabBarIcon: ({ focused ,tintColor}) => (
    <TabBarIcon
      focused={focused}
      color = {tintColor}
      name={Platform.OS === 'ios' ? 'ios-filing' : 'md-options'}
    />
  ),
};


const bottomTabNavigator =  createBottomTabNavigator({
  Home : HomeStack,
  Intraday : IntradayStack,
  Options : OptionsStack,
  Futures :FuturesStack,
},{
  initialRouteName:'Home',
//for all navigator
navigationOptions:({navigation})=>{ 
  const {routeName} = navigation.state.routes[navigation.state.index];
  return {
    // header : null,
    headerTitle :routeName,
    headerStyle: {
      borderBottomWidth: 0.5,
    }
  }
},  
tabBarOptions:{
  // activeTintColor:'red',
  inactiveTintColor:'grey'
}
});

export default createStackNavigator({
  createBottomTabNavigator : bottomTabNavigator
},{
  defaultNavigationOptions : ({navigation})=>{
    return {
      headerLeft : <Icon.Ionicons name="md-menu" size={30}
      onPress = {()=> navigation.openDrawer()} 
      style = {{paddingLeft :10,fontSize:24,color:'#999999'}}/>
    }
  }
});
