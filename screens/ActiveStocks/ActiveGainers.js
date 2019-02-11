import React, { Component } from "react";
import ActiveStocksFlatList from '../../components/ActiveStocksFlatList'

var API = require('indian-stock-exchange');
var NSEAPI = API.NSE;

class ActiveGainers extends Component {
    constructor() {
        super();
        this.state = {
            activeStocks: [],
            isLoading: true,
            currentlySelected:null,
        }
    }

    componentWillMount() {
        NSEAPI.getGainers().then((response) => {
            let gainers = response.data.data;
            this.setState({
                activeStocks: gainers,
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
export default ActiveGainers;
