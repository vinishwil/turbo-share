import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import PickerForIndices from "../components/PickerForIndices";
import IntradayFilterStock from "../components/IntradayFilterStock";
var API = require('indian-stock-exchange');
var NSEAPI = API.NSE;

var filteredMap = {};
class IntradayScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "NiftyBank",
            data: {},
            isLoading: false,
            currentlySelected: null,
            filtered: {}
        };
    }
    onValueChange(value) {
        this.setState({
            selected: value
        }, () => {
            this.componentWillMount();
        });
    }

    static navigationOptions = {
        header: null,
        title: 'Intraday',
    };

    componentWillMount() {
        let list = require('../constants/StockList')[this.state.selected];
        list.map((item) => {
            NSEAPI.getCandleStickData(item.symbol, 1, false).then((response) => {
                this.checkForStocks(response.data, item); 
            }).catch((error) => {
                console.log(error);
              });;
        })
    }

    checkForStocks(data, item) {
        let level = 0;
        let sellLevel = 0;
        let checkList = [];
        let sellCheckList = [];
        let openPrice = [];
        checkList[0] = checkList[1] = checkList[2] = 0;
        sellCheckList[0] = sellCheckList[1] = sellCheckList[2] = 0; 
        data.map((value, index) => {
            openPrice.push(parseFloat(value.g1O));
            checkList[level] = parseFloat(value.g1H) > checkList[level] ? parseFloat(value.g1H) : checkList[level];
            sellCheckList[sellLevel] = (parseFloat(value.g1L) < sellCheckList[sellLevel] || sellCheckList[sellLevel] == 0) ? parseFloat(value.g1L) : sellCheckList[sellLevel];
            if (index % 15 == 0 && index !== 0) {
                // delete filteredMap[item.name]; 
                if (openPrice[0] > parseFloat(value.g1C)) {
                    level = 0;
                    checkList[0] = checkList[1] = checkList[2] = 0;
                } else {
                    if (checkList[1] !== 0) {
                        if (checkList[1] < checkList[0]) {
                            checkList[0] = checkList[1];
                            checkList[1] = 0;
                            level = 1;
                        } else {
                            if (checkList[2] !== 0) {
                                checkList[0] = checkList[1];
                                checkList[1] = checkList[2];
                                checkList[2] = 0;
                                level = 1;
                            } else {
                                level = 2;
                            }
                        }
                    } else {
                        level++;    
                    }
                }
                if (openPrice[0] < parseFloat(value.g1C)) {
                    sellLevel = 0;
                    sellCheckList[0] = sellCheckList[1] = sellCheckList[2] = 0;
                } else {
                    if (sellCheckList[1] !== 0) {
                        if (sellCheckList[1] > sellCheckList[0]) {
                            sellCheckList[0] = sellCheckList[1];
                            sellCheckList[1] = 0;
                            sellLevel = 1;
                        } else {
                            if (sellCheckList[2] !== 0) {
                                sellCheckList[0] = sellCheckList[1];
                                sellCheckList[1] = sellCheckList[2];
                                sellCheckList[2] = 0;
                                sellLevel = 1;
                            } else {
                                sellLevel = 2;
                            }
                        }
                    } else {
                        sellLevel++;
                    }
                }
                openPrice = [];
            }
            if (checkList[2] > checkList[1] && checkList[1] !=0 && checkList[2] != 0) {
                let updateMap = { stock: item.name, closePrice: value.g1C, time: value.date ,type:'B'};
                filteredMap[item.name] = updateMap;
            }    
            if (sellCheckList[2] < sellCheckList[1] && sellCheckList[1] !=0 && sellCheckList[2] != 0) {
                let updateMap = { stock: item.name, closePrice: value.g1C, time: value.date ,type:'S'};
                filteredMap[item.name] = updateMap; 
            }
            // this.setState({
            //     filtered: filteredMap,
            //     isLoading:false,
            // })
        })
    }

    showFiltered() {
        // let filteredMap = this.state.filtered;
        let updateMap = { stock: "DLF", closePrice: 100, time: '2018-12-12 12:30' ,type:'S'};
                filteredMap["DLF"] = updateMap;
        let filteredList = [];
        Object.keys(filteredMap).map((item,key) => {
            filteredList.push(filteredMap[item]);
        });
        return (
            <IntradayFilterStock state={this.state} data = {filteredList} />
        );
        
    }
    render() {
        return (
            <View style={styles.container}>
                <PickerForIndices selected={this.state.selected}
                    onValueChange={(value) => this.onValueChange(value)} />
                {this.showFiltered()}
            </View>
        );
    }
}
export default IntradayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});             