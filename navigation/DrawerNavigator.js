import React , {Component} from "react";
import {StyleSheet,Text,View,ScrollView,Dimensions,Image} from "react-native";
import {createDrawerNavigator,DrawerItems,SafeAreaView} from "react-navigation";
import MainTabNavigator from './MainTabNavigator';
import customDrawerComponent from '../components/drawerContent';
import { Icon } from 'expo';  
import ActiveStocksTab from "../screens/ActiveStocks/ActiveStocksTab";
import TopStocks from '../screens/TopStocks/TopStocks';
import ScreenersTab from "../screens/Screeners/ScreenersTab";

const drawer = createDrawerNavigator({
    Home:{
      screen:MainTabNavigator,
      navigationOptions :{
      drawerLabel:'Home',
      drawerIcon : ({tintColor}) => (
            <Icon.Ionicons name='ios-information-circle' style={{fontSize:24,color:tintColor}}/>
        )}
    },
    ActiveStocksTab:{
    screen:ActiveStocksTab,
    navigationOptions :{
      drawerLabel:'Active Stocks',
      drawerIcon : ({tintColor}) => (
            <Icon.Ionicons name='ios-rose' style={{fontSize:24,color:tintColor}}/>
        )}                                                                              
  },
  TopStocks:{
    screen:TopStocks, 
    navigationOptions :{
      drawerLabel:'Top Stocks',
      drawerIcon : ({tintColor}) => (
            <Icon.Ionicons name='ios-trending-up' style={{fontSize:24,color:tintColor}}/>
        )}                                                                              
  },
  Screeners:{
    screen:ScreenersTab, 
    navigationOptions :{
      drawerLabel:'Screeners',
      drawerIcon : ({tintColor}) => (
            <Icon.Ionicons name='ios-pulse' style={{fontSize:24,color:tintColor}}/>
        )}                                                                              
  }}
  ,{
    contentComponent:customDrawerComponent,
    // drawerWidth : width/2,
    contentOptions:{
      activeTintColor:'orange',
      inactiveTintColor:'grey'    
    }    
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default drawer;
  