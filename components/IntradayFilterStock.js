import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";
// import { Icon } from 'expo';
import Colors from "../constants/Colors";
import { Container, Header, Content, SwipeRow, Button, Icon } from 'native-base';
import { Avatar } from 'react-native-elements';


class IntradayFilterStock extends Component {

    _renderComponent = ({ item }) => {

        return (
            // <TouchableOpacity style={styles.container} >
            <SwipeRow
                leftOpenValue={75}
                rightOpenValue={-75}
                left={
                    <Button success onPress={() => alert(item.stock)} >
                        <Icon active name="add" />
                    </Button>
                }
                body={
                    <View style={styles.mainContainer}>
                        {/* <Text style={{ paddingLeft: 15 }}>{item.stock+item.time+item.type}</Text> */}
                        <View style={styles.firstDiv}>
                            {/* <Text style={{ paddingLeft: 15 }}>{item.stock+item.time+item.type}</Text> */}
                            <Avatar rounded title={item.type}
                            overlayContainerStyle={{backgroundColor: '#dddd'}} />
                        </View>
                        <View style={styles.secondDiv}>
                            {/* <Text style={{ paddingLeft: 15 }}>{item.stock+item.time+item.type}</Text> */}

                        </View>
                    </View>
                }
                right={
                    <Button danger >
                        <Icon active name="trash" />
                    </Button>
                }
            />
            //      <View style={styles.firstRowContainer}>
            //     <View style={styles.symbolTextDiv}>
            //     <Text style={styles.symbolText}> {item.stock}</Text>
            //     </View>
            //     </View>
            //     <View style={styles.listSeperator}>
            // </View> 
            //  </TouchableOpacity> 
        )
    }


    render() {
        return (
            this.props.state.isLoading ?
                <View style={styles.activityContainer}>
                    <ActivityIndicator size='large' color='#808080' animating style={styles.activityIndicator} />
                </View>
                :
                <View style={styles.container}>
                    <FlatList data={this.props.data}
                        renderItem={this._renderComponent}
                        keyExtractor={(item, index) => item.stock} />
                </View>
        );
    }
}
export default IntradayFilterStock;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    activityContainer: {
        flex: 1,
    },
    activityIndicator: {
        marginTop: '40%'
    },
    listSeperator: {
        height: 2,
        width: '100%',
        backgroundColor: '#f2f2f2',
    },
    defaultGreen: {
        color: Colors.defaultGreen,
    },
    defaultRed: {
        color: Colors.defaultRed,
    },
    mainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        height: 60  

    },
    firstDiv: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        marginTop:18
    },
    avatar:{
marginLeft:20
    },
    secondDiv: {
        flex: 5,
        alignItems: 'flex-start'

    }


});     