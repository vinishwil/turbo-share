import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
var API = require('indian-stock-exchange');
    var NSEAPI = API.NSE;

class IntradayScreen extends Component {
    constructor() {
        super();
        this.state = {
            data: '',
        }
    }

    static navigationOptions = {
        header :null,
        title: 'Intraday',
      };

      componentWillMount() {
        NSEAPI.getCandleStickData('DLF',1,false).then((response) => {
            console.log(response)
        
        });
        NSEAPI.getIntraDayDataXML('DLF',15).then((response) => {
            console.log(response)
            this.setState({
                data: response.data.data,
            })
        
        });
        NSEAPI.get('DLF',1,false).then((response) => {
            console.log(response)
        
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>IntradayScreen</Text>
                <Text>{this.state.data} </Text>
            </View>
        );
    }
}
export default IntradayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});