import React from 'react'; 
import { createSwitchNavigator } from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';

export default createSwitchNavigator({
  Home:DrawerNavigator, 
}); 