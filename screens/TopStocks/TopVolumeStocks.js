import React, { Component } from "react";
import ActiveStocksFlatList from '../../components/ActiveStocksFlatList'

var API = require('indian-stock-exchange');
var NSEAPI = API.NSE

class TopVolumeStocks extends Component {
    constructor() {
        super();
        this.state = {
            activeStocks: [],
            isLoading: true,
            currentlySelected:null,
        }
    }
    componentWillMount() {
        NSEAPI.getTopVolumeStocks().then((response) => {
            let losers = response.data.data;
            this.setState({
                activeStocks: losers,
                isLoading: false,
            })
        });
    }

    updateCurrentlySelected = (symbol) =>()  => {
        this.setState({currentlySelected:symbol})
    };
    render() {
        return (
           <ActiveStocksFlatList state = {this.state}
            updateCurrentlySelected ={(symbol) => this.updateCurrentlySelected(symbol)}/>
        );
    }
}
export default TopVolumeStocks;
