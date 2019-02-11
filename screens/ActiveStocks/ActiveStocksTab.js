import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,SafeAreaView,ScrollView,TouchableOpacity
} from "react-native";
import {Header,Right,Left, Body, Title,Button,Segment,Content} from "native-base";
import { Icon } from 'expo';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import ActiveStocks from "./ActiveStocks";
import ActiveNextNiftyStocks from "./ActiveNextNiftyStocks";
import ActiveOptionStocks from "./ActiveOptionStocks";

class ActiveStocksTabs extends Component {

    render() {
        return (
            <View style={styles.container}>
            <Header hasTabs>
            <Left>
            <Button transparent >   
              <Icon.Ionicons name='ios-arrow-back' size={30} onPress = {(props)=> this.props.navigation.navigate('Home')}/> 
            </Button>       
          </Left>
                <Body>
                    <Title>Stocks</Title>
                </Body>
                <Right>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Icon.Ionicons name='ios-refresh' size={30} />   
            </TouchableOpacity>
                    </Right>    
            </Header>
        <Tabs  tabBarPosition='bottom'
        renderTabBar={()=> <ScrollableTab
underlineStyle={{backgroundColor: '#0366d6'}}/>}>
          <Tab heading="Nifty">
            <ActiveStocks />
          </Tab>
          <Tab heading="Next 50">
          <ActiveNextNiftyStocks/>
          </Tab>
          <Tab heading="FnO">
          <ActiveOptionStocks/>
          </Tab>
        </Tabs>
         </View>
        )
    }
}
export default ActiveStocksTabs;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
}); 