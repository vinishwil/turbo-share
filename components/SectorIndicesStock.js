import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";
var axios = require('axios');
import Colors from "../constants/Colors";
import { Icon } from 'expo';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import SectorIndicesFlatList from "./SectorIndicesFlatList";

class SectorIndicesStock extends Component {

    constructor() {
        super();
        this.state = {
            data: {},
            indexData: {},
            isLoading: true,
            currentlySelected: null,
        }
    }

    componentWillMount() {
        let url = '';
        switch (this.props.indicesSelected) {
            case 'NIFTY BANK':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/bankNiftyStockWatch.json';
                break;
            case 'NIFTY AUTO':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxAutoStockWatch.json';
                break;
            case 'NIFTY FIN SERVICE':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxFinanceStockWatch.json';
                break;
            case 'NIFTY FMCG':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxFMCGStockWatch.json';
                break;
            case 'NIFTY IT':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxitStockWatch.json';
                break;
            case 'NIFTY MEDIA':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxMediaStockWatch.json';
                break;
            case 'NIFTY METAL':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxMetalStockWatch.json';
                break;
            case 'NIFTY PHARMA':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxPharmaStockWatch.json';
                break;
            case 'NIFTY PSU BANK':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxPSUStockWatch.json';
                break;
            case 'NIFTY REALTY':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxRealtyStockWatch.json';
                break;
            case 'NIFTY PVT BANK':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyPvtBankStockWatch.json';
                break;
                case 'NIFTY 50':
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json';
                break;
            default:
                url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/bankNiftyStockWatch.json';
                break
        }
        this._getData(url);
    }

    _getData(url) {
        axios.get(url).then((response) => {
            let data = response.data;
            this.setState({
                data: data,
                indexData: data.latestData[0],
                isLoading: false,
            })
        });
    }

    updateCurrentlySelected = (symbol) => () => {
        this.setState({ currentlySelected: symbol })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    {this.state.isLoading ?
                        <View style={styles.activityContainer}>
                            <ActivityIndicator size='large' color='#808080' animating style={styles.activityIndicator} />
                        </View>
                        :
                        <View style={styles.headerContainer}>
                            <Text style={styles.indexName}>{this.state.indexData.indexName}</Text>
                            <Text style={styles.curentPrice}>{this.state.indexData.ltp}</Text>
                            <Text style={[(parseFloat(this.state.indexData.per) > 0 ? styles.defaultGreen : styles.defaultRed), styles.changePrice]}>
                                {parseFloat(this.state.indexData.ch).toFixed(2) + '  (' + this.state.indexData.per + '%)'}</Text>
                            <Text style={styles.updatedTime}>{this.state.data.time}</Text>
                        </View>
                    }
                </View>
                <View style={styles.tabBarcontainer}>
                    <Tabs tabBarPosition='top'
                        renderTabBar={() => <ScrollableTab
                            underlineStyle={{ backgroundColor: '#0366d6' }} />}>
                        <Tab heading="Gainers">
                            <SectorIndicesFlatList state={this.state} check={'gainers'}
                                updateCurrentlySelected={(symbol) => this.updateCurrentlySelected(symbol)} />
                        </Tab>
                        <Tab heading="Loosers">
                            <SectorIndicesFlatList state={this.state} check={'loosers'}
                                updateCurrentlySelected={(symbol) => this.updateCurrentlySelected(symbol)} />
                        </Tab>
                    </Tabs>
                </View>
            </View>
        );
    }
}
export default SectorIndicesStock;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    tabBarContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    mainContainer: {
        height: 120,
        flexDirection: 'row',
        backgroundColor: '#b3b3b3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityContainer: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    activityIndicator: {
        // marginTop: '50%'
    },
    indexName: {
        color: '#fff',
        padding: 5,
        fontWeight: '400',
        fontSize: 14
    },
    curentPrice: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '400'
    },
    changePrice: {
        padding: 5,
        fontSize: 14,
        fontWeight: 'bold'
    },
    updatedTime: {
        color: '#1a1a1a',
        fontSize: 10,

    },
    defaultGreen: {
        color: Colors.defaultGreen,
    },
    defaultRed: {
        color: Colors.defaultRed,
    },
});