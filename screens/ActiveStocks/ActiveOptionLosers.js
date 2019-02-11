import React, { Component } from "react";
import ActiveStocksFlatList from '../../components/ActiveStocksFlatList'

var axios = require('axios');
var url = 'https://www.nseindia.com/live_market/dynaContent/live_analysis/losers/fnoLosers1.json';

class ActiveOptionLosers extends Component {
    constructor() {
        super();
        this.state = {
            activeStocks: [],
            isLoading: true,
            currentlySelected:null,
        }
    }
    componentWillMount() {
        axios.get(url).then((response) => {
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
export default ActiveOptionLosers;
