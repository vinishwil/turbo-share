import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";
import { Icon } from 'expo';


class ActiveGainers extends Component {

    _renderComponent = ({ item }) => {
        item.openPrice = item.openPrice != null ? item.openPrice: '0' ;
        item.lowPrice = item.lowPrice != null ? item.lowPrice: '0' ;
        item.highPrice = item.highPrice != null ? item.highPrice: '0' ;
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.updateCurrentlySelected(item.symbol)}>
                <View style={styles.firstRowContainer}>
                    <View style={styles.symbolDiv}>
                        <Text style={styles.symbolText}> {item.symbol}</Text>
                        {parseFloat(item.openPrice.replace(',', '')) == parseFloat(item.lowPrice.replace(',', '')) && item.openPrice != '0'
                            ? <Icon.Ionicons name='ios-star' size={20} style={styles.openLow} />
                            : null
                        }
                        {parseFloat(item.openPrice.replace(',', '')) == parseFloat(item.highPrice.replace(',', '')) && item.openPrice != '0'
                            ? <Icon.Ionicons name='ios-star' size={20} style={styles.openHigh} />
                            : null
                        }
                    </View>
                    <View style={styles.currentPriceDiv}>
                        {item.netPrice > 0 ?
                            <Icon.Ionicons name='md-arrow-dropup' size={20} style={styles.currentPricePositive} />
                            :
                            <Icon.Ionicons name='md-arrow-dropdown' size={20} style={styles.currentPriceNegative} />
                        }
                        {item.netPrice > 0 ?
                            <Text style={styles.currentPriceText}>{item.ltp}</Text>
                            :
                            <Text style={styles.currentPriceTextNegative}>{item.ltp}</Text>
                        }
                    </View>
                </View>
                <View style={styles.secondRowContainer}>
                    <View style={styles.marketDiv}>
                        <Text style={styles.marketText}> NSE</Text>
                    </View>
                    <View style={styles.changePriceDiv}>
                        <Text style={styles.changePriceText}>{(parseFloat(item.ltp.replace(',', '')) - parseFloat(item.previousPrice.replace(',', ''))).toFixed(2)
                            + '(' + item.netPrice + '%)'}</Text>
                    </View>
                </View>
                {this.props.state.currentlySelected == item.symbol
                    ?
                    <View style={styles.thirdRowContainer}>
                        <View style={styles.openPriceDiv}>
                            <Text style={styles.openPriceText}>{'Open: ' + item.openPrice}</Text>
                        </View>
                        <View style={styles.highPriceDiv}>
                            <Text style={styles.highPriceText}>{'High: ' + item.highPrice}</Text>
                        </View>
                        <View style={styles.lowPriceDiv}>
                            <Text style={styles.lowPriceText}> {'Low: ' + item.lowPrice}</Text>
                        </View>
                    </View>
                    : null}
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
                    <FlatList data={this.props.state.activeStocks}
                        extraData={this.props.state.currentlySelected}
                        renderItem={this._renderComponent}
                        keyExtractor={(item, index) => item.symbol}
                        ItemSeparatorComponent={this.renderSeperator} />
                </View>
        );
    }
}
export default ActiveGainers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    activityContainer: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    activityIndicator: {
        marginTop: '50%'
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