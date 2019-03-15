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
var axios = require('axios');
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

    // componentWillMount() {
    //     let list = require('../constants/StockList')[this.state.selected];
    //     list.map((item) => {
    //         NSEAPI.getCandleStickData(item.symbol, 1, false).then((response) => {
    //             this.checkForStocks(response.data, item); 
    //         }).catch((error) => {
    //             console.log(error);
    //           });;
    //     })
    // }

    componentWillMount() {
        let list = require('../constants/StockList')[this.state.selected];
        list.map((item) => {
            console.log(this.makeURL(item.id))
            axios.get(this.makeURL(item.id)).then((response) => {
                console.log('got response' + item.name)
                this.checkStocks(response.data.data.candles, item)
            }).catch((error) => {
                console.log(error);
            });
        })
    }

    makeURL(id) {
        let date = new Date();
        let dateString = date.getFullYear() + '-';
        if (parseInt(date.getMonth()) + 1 < 10) {
            dateString = dateString + '0' + (date.getMonth() + 1) + '-';
        } else {
            dateString = dateString + (date.getMonth() + 1) + '-';
        }
        if (parseInt(date.getDate()) < 10) {
            dateString = dateString + '0' + date.getDate();
        } else {
            dateString = dateString + date.getDate();
        }
        let firstString = 'https://kitecharts-aws.zerodha.com/api/chart/';
        let secondString = '/minute?public_token=ZcnSwLFje1yYsKhbM2cznDsFnDsMXLM6&user_id=NK3532' +
            '&api_key=kitefront&access_token=&from=' + dateString + '&to=' + dateString + '&ciqrandom=1552408744381';
        return firstString + id + secondString;
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
            if (checkList[2] > checkList[1] && checkList[1] != 0 && checkList[2] != 0) {
                let updateMap = { stock: item.name, closePrice: parseFloat(value.g1C), time: value.date, type: 'B' };
                filteredMap[item.name] = updateMap;
            }
            if (sellCheckList[2] < sellCheckList[1] && sellCheckList[1] != 0 && sellCheckList[2] != 0) {
                let updateMap = { stock: item.name, closePrice: parseFloat(value.g1C), time: value.date, type: 'S' };
                filteredMap[item.name] = updateMap;
            }
            this.setState({
                filtered: filteredMap,
                isLoading:false,
            })
        })
    }

    checkStocks(data, item) {
        let level = 0;
        let sellLevel = 0;
        let checkList = [];
        let sellCheckList = [];
        let openPrice = [];
        checkList[0] = checkList[1] = checkList[2] = 0;
        sellCheckList[0] = sellCheckList[1] = sellCheckList[2] = 0;
        data.map((value, index) => {
            openPrice.push(parseFloat(value[1]));
            checkList[level] = parseFloat(value[2]) > checkList[level] ? parseFloat(value[2]) : checkList[level];
            sellCheckList[sellLevel] = (parseFloat(value[3]) < sellCheckList[sellLevel] || sellCheckList[sellLevel] == 0) ? parseFloat(value[3]) : sellCheckList[sellLevel];
            if (index % 15 == 0 && index !== 0) {
                // delete filteredMap[item.name]; 
                if (openPrice[0] > parseFloat(value[4])) {
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
                if (openPrice[0] < parseFloat(value[4])) {
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
            let time = value[0].split('+')[0];
            time = time.split('T');
            let newTime = time[1].split(':');
            newTime = newTime[0] + ':' + newTime[1];
            time = time[0] + ' ' + newTime;
            if (checkList[2] > checkList[1] && checkList[1] != 0 && checkList[2] != 0) {
                let updateMap = { stock: item.name, closePrice: parseFloat(value[4]), time: time, type: 'B' };
                filteredMap[item.name] = updateMap;
            }
            if (sellCheckList[2] < sellCheckList[1] && sellCheckList[1] != 0 && sellCheckList[2] != 0) {
                let updateMap = { stock: item.name, closePrice: parseFloat(value[4]), time: time, type: 'S' };
                filteredMap[item.name] = updateMap;
            }
            this.setState({
                filtered: filteredMap,
                isLoading: false,
            })
        })
    }

    showFiltered() {
        let filteredMap = this.state.filtered;
        // let updateMap = { stock: "DLF", closePrice: 100, time: '2018-12-12 12:30', type: 'S' };
        // filteredMap["DLF"] = updateMap;
        let filteredList = [];
        Object.keys(filteredMap).map((item, key) => {
            filteredList.push(filteredMap[item]);
        });
        return (
            <IntradayFilterStock state={this.state} data={filteredList} />
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