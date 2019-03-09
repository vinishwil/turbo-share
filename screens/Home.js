import React, { Component } from "react";
import Modal from 'react-native-modalbox';
import {
    View,
    Text,
    StyleSheet, SafeAreaView, ScrollView, RefreshControl, TouchableHighlight
} from "react-native";
import { connect } from 'react-redux';
var axios = require('axios');
var url = 'https://www.bloombergquint.com/feapi/markets/indices/global-markets?tab=index';
import SectorIndicesList from '../components/SectorIndicesList'
import GlobaMarketData from "../components/GlobalMarketData";
import SectorIndicesStock from '../components/SectorIndicesStock'

const indices = [
    'NIFTY 50',
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
            refreshing: false,
            modalVisible: false,
            selectedIndices: ''
        }
    }
    static navigationOptions = {
        // title : 'Home',
        header: null
    };
    componentWillMount() {
        axios.get(url).then((response) => {
            let globalData = response.data.data;
            this.setState({
                globalMarketData: globalData,
                isGlobalMarketLoading: false,
                refreshing: false
            })
        });
    }

    _onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.componentWillMount();
        })
    }
    openModalData = (symbol) => () => {
        this.setState({
            modalVisible: true,
            selectedIndices: symbol
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.indicesHeader}>
                    <Text style={styles.indicesText}>Indices</Text>
                </View>
                <ScrollView style={styles.sectorContainer}>
                    <View style={styles.sectorContainer}>
                        <SectorIndicesList state={this.state} data={this.props.nseLive}
                            filterList={indices} openModalData={(symbol) => this.openModalData(symbol)} />
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
                <Modal style={styles.modal}
                    position={'bottom'}
                    isOpen={this.state.modalVisible}
                    onClosed={() => this.setState({ modalVisible: false })}
                    backdropOpacity={0.5}
                    swipeArea={200}
                    backdropPressToClose={false}
                    entry={'bottom'}
                    coverScreen={false}
                >
                   <SectorIndicesStock indicesSelected = {this.state.selectedIndices}/>
                </Modal>
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
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: "#fff"
    },
});