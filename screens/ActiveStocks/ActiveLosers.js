import React, { Component } from "react";
import ActiveStocksFlatList from '../../components/ActiveStocksFlatList'

var API = require('indian-stock-exchange');
var NSEAPI = API.NSE

class ActiveLosers extends Component {
    constructor() {
        super();
        this.state = {
            activeStocks: [],
            isLoading: true,
            currentlySelected:null,
        }
    }
    componentWillMount() {
        NSEAPI.getLosers().then((response) => {
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
export default ActiveLosers;
