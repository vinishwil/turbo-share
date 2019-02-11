import React, { Component } from "react";
import ActiveStocksFlatList from '../../components/ActiveStocksFlatList'

var axios = require('axios');
var url = 'https://www.nseindia.com/live_market/dynaContent/live_analysis/gainers/fnoGainers1.json';


class ActiveOptionGainers extends Component {
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
export default ActiveOptionGainers;
