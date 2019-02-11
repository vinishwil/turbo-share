import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,SafeAreaView,ScrollView,TouchableOpacity
} from "react-native";
import {Header,Right,Left, Body, Title,Button,Segment,Content} from "native-base";
import { Icon } from 'expo';
import TopValueStocks from "./TopValueStocks";
import TopVolumnStocks from "./TopVolumeStocks";

class TopStocks extends Component {
    state = {
        activePage:1,
    }
    
    selectComponent = (activePage) => () => this.setState({activePage});
    
    _renderComponent = () => {
      if(this.state.activePage === 1)
        return <TopValueStocks/> 
      else 
        return <TopVolumnStocks/> 
    }

    render() {
        return (
            <View style={styles.container}>
              <Header >
            <Left>
            <Button transparent >   
              <Icon.Ionicons name='ios-arrow-back' size={30} onPress = {(props)=> this.props.navigation.navigate('Home')}/> 
            </Button>       
          </Left>
                <Body>
                    <Title>Trend Stock</Title>
                </Body>
                <Right>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Icon.Ionicons name='ios-refresh' size={30} />   
            </TouchableOpacity>
                    </Right>    
            </Header>
                <Segment style={styles.segmentContent} >
          <Button first active={this.state.activePage === 1} onPress= {this.selectComponent(1)}
           style={this.state.activePage === 1 ? styles.segmentButtonActive : styles.segmentButton}>     
            <Text style={this.state.activePage === 1 ? styles.segmentButtonTextActive : styles.segmentButtonText}>Top Value</Text>   
          </Button>
          <Button last active={this.state.activePage === 2} onPress= {this.selectComponent(2)}
          style={this.state.activePage === 2 ? styles.segmentButtonActive : styles.segmentButton}>
            <Text style={this.state.activePage === 2 ? styles.segmentButtonTextActive : styles.segmentButtonText}>Top Volume</Text>
          </Button>
        </Segment>
        <Content padder>
        {this._renderComponent()}
        </Content>
         </View>
        )
    }
}
export default TopStocks;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
      },
    segmentContent:{
        backgroundColor:'#fff',
    },
    segmentButtonActive:{   
        width:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#808080',
        borderColor:'#808080'
    },
    segmentButton:{   
        width:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderColor:'#808080',
    },
    segmentButtonTextActive:{   
        color:'#fff'        
    },
    segmentButtonText:{   
        color:'#808080'    
    }
}); 