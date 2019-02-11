import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, ActivityIndicator, TouchableOpacity, FlatList
} from "react-native";
import Colors from "../constants/Colors";

class GlobaMarketData extends Component {

    _renderComponent = ({ item }) => {
        let colourIndicator;
        if (parseInt(item['points-changed']) >= 0) {
            colourIndicator = styles.defaultGreen;
        } else {
            colourIndicator = styles.defaultRed;
        }
        return (
            <TouchableOpacity style={styles.container} >
                <View style={styles.firstRowContainer}>
                    <View style={styles.symbolTextDiv}>
                        <Text style={styles.symbolText}> {item.name}</Text>
                    </View>

                    <View style={styles.currentPriceDiv}>
                        <Text style={Object.assign({}, styles.currectPrice, colourIndicator)}> {(item['latest-points'].toFixed(2))}</Text>
                    </View>
                    <View style={styles.changePriceDiv}>
                        <Text style={Object.assign({}, styles.changePrice, colourIndicator)}> {(item['points-changed'].toFixed(2))}</Text>
                    </View>
                    <View style={styles.percentageChangeDiv}>
                        <Text style={Object.assign({}, styles.percentageChange, colourIndicator)}> {(item['points-changed-percentage'].toFixed(2))}</Text>
                    </View>
                </View>
                <View style={styles.listSeperator}>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            this.props.state.isGlobalMarketLoading == true ?
                <View style={styles.activityContainer}>
                    <ActivityIndicator size='large' color='#808080' animating style={styles.activityIndicator} />
                </View>
                :
                <View style={styles.container}>
                    {Object.keys(this.props.data).map((keys) => {
                        return (
                            <View key={keys} >
                                <Text key={keys + 'text'} style={styles.indicesText}>{keys}</Text>
                                <FlatList data={this.props.data[keys]}
                                    renderItem={this._renderComponent}
                                    keyExtractor={(item, index) => item.name}/>
                            </View>)
                    })}
                </View>
        );
    }
}
export default GlobaMarketData;

const styles = StyleSheet.create({
    activityContainer: {
        flex: 1,
    },
    activityIndicator: {
        marginTop: '20%'
    },
    listSeperator: {
        height: 2,
        width: '100%',
        backgroundColor: '#f2f2f2',
    },
    firstRowContainer: {
        height: 30,
        flex: 1,
        flexDirection: 'row',
        marginTop: 3,
        padding: 5,
    },
    defaultGreen: {
        color: Colors.defaultGreen,
    },
    defaultRed: {
        color: Colors.defaultRed,
    },
    symbolTextDiv: {
        flex: 2,
        alignItems: 'flex-start',
        width: '40%'
    },
    symbolText: {
        fontSize: 12
    },
    currentPriceDiv: {
        flex: 1,
        alignItems: 'flex-end',
    },
    currectPrice: {
        alignSelf: 'flex-end',
    },
    changePriceDiv: {
        flex: 1,
        alignItems: 'flex-end',
    },
    changePrice: {
        alignSelf: 'flex-end',
    },
    percentageChangeDiv: {
        flex: 1,
        alignItems: 'flex-end',
    },
    percentageChange: {
        alignSelf: 'flex-end',
        flex: 1
    },
    indicesText: {
        padding: 10,
        fontSize: 14,
        color:'#999999',
        fontWeight:'bold'
    }
});