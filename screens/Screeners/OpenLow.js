import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
var axios = require('axios');
import OpenHighLowScreener from "../../components/OpenHighLowScreener";
import PickerForIndices from "../../components/PickerForIndices";

class OpenLow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "Nifty50",
            data: {},
            indexData: {},
            isLoading: true,
            currentlySelected: null,
        };
    }
    onValueChange(value) {
        this.setState({
            selected: value
        }, () => {
            this.componentWillMount();
        });
    }
    componentWillMount() {
        let url = require('../../constants/UrlConstant')[this.state.selected];
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
               <PickerForIndices selected = {this.state.selected}
               onValueChange={(value) => this.onValueChange(value)}/>
                <View style={styles.tabBarcontainer}>
                    <OpenHighLowScreener state={this.state} check={'openLow'}
                        updateCurrentlySelected={(symbol) => this.updateCurrentlySelected(symbol)} />
                </View>
            </View>
        );
    }
}
export default OpenLow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarcontainer:{
        flex:1
    }
});