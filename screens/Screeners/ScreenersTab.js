import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'expo';  
import ScreenersMainPage from './ScreenersMainPage';
import OpenHigh from './OpenHigh';
import OpenLow from './OpenLow';

export default createStackNavigator({
  Screeners : ScreenersMainPage,
  OpenHigh:OpenHigh,
  OpenLow:OpenLow
},{
  defaultNavigationOptions : ({navigation})=>{
    return {
        headerTitle :navigation.state.routeName,
        headerStyle: {
          borderBottomWidth: 0.5,
        },
      // headerLeft : <Icon.Ionicons name="md-menu" size={30}
      // onPress = {()=> navigation.openDrawer()} 
      // style = {{paddingLeft :10,fontSize:24,color:'#999999'}}/>
    }
  }
});
