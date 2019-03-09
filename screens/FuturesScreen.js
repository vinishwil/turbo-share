import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class FuturesScreen extends Component {
  static navigationOptions = {
    header :null,
    title: 'Futures',
  };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.contentText}>Screen Not Avaliable</Text>
            </View>
        );
    }
}
export default FuturesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    contentText:{
        fontWeight:'bold',
        color:'#dddd',
        fontSize:24
    }
});