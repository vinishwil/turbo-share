import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";
import { Icon } from 'expo';


class OpenHighLowScreener extends Component {

    _renderComponent = ({ item }) => {
        if (this.props.check == 'openLow' && parseFloat(item.open.replace(',', '')) != parseFloat(item.low.replace(',', ''))) {
            return null;
        }
        if (this.props.check == 'openHigh' && parseFloat(item.open.replace(',', '')) != parseFloat(item.high.replace(',', ''))) {
            return null;
        }
        return (
            <TouchableOpacity style={styles.touchContainer} onPress={this.props.updateCurrentlySelected(item.symbol)}>
                <View style={styles.firstRowContainer}>
                    <View style={styles.symbolDiv}>
                        <Text style={styles.symbolText}> {item.symbol}</Text>
                        {/* {parseFloat(item.open.replace(',', '')) == parseFloat(item.low.replace(',', '')) && item.open != '0'
                            ? <Icon.Ionicons name='ios-star' size={20} style={styles.openLow} />
                            : null
                        }
                        {parseFloat(item.open.replace(',', '')) == parseFloat(item.high.replace(',', '')) && item.open != '0'
                            ? <Icon.Ionicons name='ios-star' size={20} style={styles.openHigh} />
                            : null
                        } */}
                    </View>
                    <View style={styles.currentPriceDiv}>
                        {parseFloat(item.iislPercChange) > 0 ?
                            <Icon.Ionicons name='md-arrow-dropup' size={20} style={styles.currentPricePositive} />
                            :
                            <Icon.Ionicons name='md-arrow-dropdown' size={20} style={styles.currentPriceNegative} />
                        }
                        {parseFloat(item.iislPercChange) > 0 ?
                            <Text style={styles.currentPriceText}>{item.ltP}</Text>
                            :
                            <Text style={styles.currentPriceTextNegative}>{item.ltP}</Text>
                        }
                    </View>
                </View>
                <View style={styles.secondRowContainer}>
                    <View style={styles.marketDiv}>
                        <Text style={styles.marketText}> NSE</Text>
                    </View>
                    <View style={styles.changePriceDiv}>
                        <Text style={styles.changePriceText}>{parseFloat(item.iislPtsChange.replace(',', '')).toFixed(2)
                            + '(' + item.iislPercChange + '%)'}</Text>
                    </View>
                </View>
                {this.props.state.currentlySelected == item.symbol
                    ?
                    <View style={styles.thirdRowContainer}>
                        <View style={styles.openPriceDiv}>
                            <Text style={styles.openPriceText}>{'Open: ' + item.open}</Text>
                        </View>
                        <View style={styles.highPriceDiv}>
                            <Text style={styles.highPriceText}>{'High: ' + item.high}</Text>
                        </View>
                        <View style={styles.lowPriceDiv}>
                            <Text style={styles.lowPriceText}> {'Low: ' + item.low}</Text>
                        </View>
                    </View>
                    : null}
                <View style={styles.listSeperator}>
                </View>
            </TouchableOpacity>
        )
    }

    renderSeperator = () => {
        return (
            <View style={styles.listSeperator}>
            </View>
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
                    <FlatList data={this.props.state.data.data}
                        extraData={this.props.state.currentlySelected}
                        renderItem={this._renderComponent}
                        keyExtractor={(item, index) => item.symbol}
                    />
                </View>
        );
    }
}
export default OpenHighLowScreener;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    activityContainer: {
        flex: 1,
        justifyContent: 'center',
        height: '100%'
    },
    activityIndicator: {
        marginTop: '20%'
    },
    listSeperator: {
        height: 1,
        width: '100%',
        backgroundColor: '#f2f2f2',
    },
    firstRowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 3,
        padding: 5,
    },
    secondRowContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
    },
    thirdRowContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
    },
    symbolDiv: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    symbolText: {

    },
    currentPriceDiv: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    currentPricePositive: {
        // marginTop:-5,
        marginRight: 5,
        color: '#077a18',
    },
    currentPriceNegative: {
        // marginTop:-5,
        marginRight: 5,
        color: 'red',
    },
    openLow: {
        marginLeft: 5,
        color: '#077a18',
    },
    openHigh: {
        marginLeft: 5,
        color: 'red',
    },
    currentPriceClosed: {

    },
    currentPriceText: {
        position: 'relative',
        color: '#077a18',
        fontSize: 14,
        fontWeight: '400',
    },
    currentPriceTextNegative: {
        position: 'relative',
        color: 'red',
        fontSize: 14,
        fontWeight: '400',
    },
    marketDiv: {
        flex: 1,

    },
    marketText: {
        color: '#a6a6a6',
        fontSize: 10,
    },
    changePriceDiv: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    changePriceText: {
        color: '#a6a6a6',
        fontSize: 14,
        fontWeight: '500',
    },
    openPriceDiv: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    openPriceText: {
        color: '#a6a6a6',
        fontSize: 14,
        fontWeight: '500',
    },
    highPriceDiv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    highPriceText: {
        color: '#a6a6a6',
        fontSize: 14,
        fontWeight: '500',
    },
    lowPriceDiv: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    lowPriceText: {
        color: '#a6a6a6',
        fontSize: 14,
        fontWeight: '500',
    }
});