import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, SafeAreaView, ScrollView,RefreshControl
} from "react-native";
import { connect } from 'react-redux';
var axios = require('axios');
var url = 'https://www.bloombergquint.com/feapi/markets/indices/global-markets?tab=index';
import SectorIndicesList from '../components/SectorIndicesList'
import GlobaMarketData from "../components/GlobalMarketData";

const indices = [
    'NIFTY BANK',
    'NIFTY AUTO',
    'NIFTY FIN SERVICE',
    'NIFTY FMCG',
    'NIFTY IT',
    'NIFTY MEDIA',
    'NIFTY METAL',
    'NIFTY PHARMA',
    'NIFTY PSU BANK',
    'NIFTY PVT BANK',
    'NIFTY REALTY'
]

class Home extends Component {
    constructor() {
        super();
        this.state = {
            globalMarketData: {},
            isLoading: true,
            isGlobalMarketLoading: true,
            refreshing: false
        }
    }
    static navigationOptions = {
        // title : 'Home',
        header: null
    };
    componentWillMount() {
        axios.get(url).then((response) => {
            console.log(response);
            let globalData = response.data.data;
            this.setState({
                globalMarketData: globalData,
                isGlobalMarketLoading: false,
                refreshing: false
            })
        });
    }

    _onRefresh = () => {
        console.log('refresh')
        this.setState({
            refreshing: true
        }, () => {
            this.componentWillMount();
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.indicesHeader}>
                    <Text style={styles.indicesText}>Indices</Text>
                </View>
                <ScrollView style={styles.sectorContainer}>
                    <View style={styles.sectorContainer}>
                        <SectorIndicesList state={this.state} data={this.props.nseLive} filterList={indices} />
                    </View>
                </ScrollView>
                <View style={styles.indicesHeader}>
                    <Text style={styles.indicesText}>Global Market</Text>
                </View>
                <ScrollView style={styles.sectorContainer}  
                refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                    <View style={styles.sectorContainer}>
                        <GlobaMarketData state={this.state} data={this.state.globalMarketData} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        nseLive: state.liveDataNseBse.nseLive
    }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    sectorContainer: {
        flex: 1,
        height: '50%'
    },
    indicesHeader: {
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#f2f2f2',
    },
    indicesText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 15,
        color: '#404040',
    }
});