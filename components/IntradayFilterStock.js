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
                        <View style={styles.firstDiv}>
                            <Avatar rounded title={item.type} 
                                overlayContainerStyle={{ backgroundColor: '#dddd' }} />
                        </View>
                        <View style={styles.secondDiv}>
                            <View style={styles.stockDiv}>
                                <View style={styles.stockNameDiv}>
                                    <Text style={styles.stockSymbolText}>{item.stock}</Text>
                                    <Text style={styles.stockNameText}>{item.stock}</Text>
                                </View>
                                <View style={styles.entryPriceDiv}>
                                    <Text style={styles.entryPriceValue}>{item.closePrice}</Text>
                                    <Text style={styles.entryPriceText}>Entry Price</Text>
                                </View>
                            </View>
                            <View style={styles.priceDiv}>
                                <View style={styles.exitPriceDiv}>
                                    <Text style={styles.exitPriceText}>Exit Price</Text>
                                    <Text style={styles.exitPriceValue}>{(item.closePrice + (item.closePrice * 0.005)).toFixed(2)}</Text>
                                </View>
                                <View style={styles.stopLossDiv}>
                                    <Text style={styles.stopLossText}>Stop Loss</Text>
                                    <Text style={styles.stopLossValue}>{(item.closePrice - (item.closePrice * 0.005)).toFixed(2)}</Text>
                                </View>
                                <View style={styles.currentPriceDiv}>
                                    <Text style={styles.currentPriceText}>Current Price</Text>
                                    <Text style={styles.currentPriceValue}>{item.closePrice}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }
                right={
                    <Button danger >
                        <Icon active name="trash" />
                    </Button>
                }
            />
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    firstDiv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,

    },
    avatar: {
        marginLeft: 10
    },
    secondDiv: {
        flex: 7,
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    stockDiv: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        marginLeft: 15
    },
    priceDiv: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
    },
    stockNameDiv: {
        flex: 1,
    },
    entryPriceDiv: {
        flex: 1,
        alignItems: 'flex-end'
    },
    exitPriceDiv: {
        flex: 1,
        paddingLeft: 15,
    },
    stopLossDiv: {
        flex: 1,
        paddingLeft: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#bfbfbf',
    },
    currentPriceDiv: {
        flex: 1,
        paddingLeft: 15,
        borderLeftWidth: 1,
        // borderLeftColor: '#f2f2f2',
        borderLeftColor: '#bfbfbf',
    },
    exitPriceText: {
        color: '#a6a6a6',
        fontSize: 14,
    },
    exitPriceValue: {
        paddingTop: 1,
        color: '#262626'
    },
    entryPriceText: {
        color: '#a6a6a6',
        fontSize: 14,
    },
    entryPriceValue: {
        paddingTop: 1,
        color: '#333333',
        fontWeight:'bold'
    },
    stopLossText: {
        color: '#a6a6a6',
        fontSize: 14,
    },
    stopLossValue: {
        paddingTop: 1,
        color: '#262626'
    },
    currentPriceText: {
        color: '#a6a6a6',
        fontSize: 14,
    },
    currentPriceValue: {
        paddingTop: 1,
    },
    stockSymbolText: {
        color: '#262626'
    },
    stockNameText: {
        paddingTop: 1,
        color: '#a6a6a6',
        fontSize: 10,
    },

});     