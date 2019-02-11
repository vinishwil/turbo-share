import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class OptionsScreen extends Component {
    static navigationOptions = {
        header :null,
        title: 'Options',
      };
    render() {
        return (
            <View style={styles.container}>
                <Text>OptionsScreen</Text>
            </View>
        );
    }
}
export default OptionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});