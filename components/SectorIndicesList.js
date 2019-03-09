import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";
import { Icon } from 'expo';
import Colors from "../constants/Colors";


class ActiveGainers extends Component {

    _renderComponent = ({ item }) => {
        if(!this.props.filterList.includes(item.indexName)){
            return null;
        }
        let colourIndicator;
        if (parseInt(item.last.replace(',', '')) >= parseInt(item.previousClose.replace(',', ''))) {
            colourIndicator = styles.defaultGreen;
        } else {
            colourIndicator = styles.defaultRed;
        }
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.openModalData(item.indexName)}>
                <View style={styles.firstRowContainer}>
                <View style={styles.symbolTextDiv}>
                <Text style={styles.symbolText}> {item.indexName}</Text>
                </View>
                
                <View style={styles.currentPriceDiv}>
                <Text style={Object.assign({}, styles.currectPrice, colourIndicator)}> {item.last}</Text>
                </View>
                <View style={styles.changePriceDiv}>
                <Text style={Object.assign({}, styles.changePrice, colourIndicator)}> {(parseFloat(item.last.replace(',', ''))
                        - parseFloat(item.previousClose.replace(',', ''))).toFixed(2)}</Text>
                </View>
                <View style={styles.percentageChangeDiv}>
                <Text style={Object.assign({}, styles.percentageChange, colourIndicator)}> {item.percChange+'%'}</Text>
                </View>
                </View>
                <View style={styles.listSeperator}>
            </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            !this.props.data ?
                <View style={styles.activityContainer}>
                    <ActivityIndicator size='large' color='#808080' animating style={styles.activityIndicator}/>
                </View>
                :
                <View style={styles.container}>
                    <FlatList data={this.props.data}
                        renderItem={this._renderComponent}
                        keyExtractor={(item, index) => item.indexName} />
                </View>
        );
    }
}
export default ActiveGainers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    activityContainer: {
        flex: 1,
    },
    activityIndicator:{
       marginTop:'20%'
    },
    listSeperator: {
        height: 2,
        width: '100%',
        backgroundColor: '#f2f2f2',
    },
    firstRowContainer: {
        height:30,
        flex: 1,
        flexDirection: 'row',
        marginTop: 3,
        padding: 5,
    },
    defaultGreen: {
        color: Colors.defaultGreen,
    },
    defaultRed: {
        color: Colors.defaultRed,
    },
    symbolTextDiv:{
        flex:2,
        alignItems:'flex-start',
        width:'40%'
    },
    symbolText:{
fontSize:12
    },
    currentPriceDiv:{
        flex:1,
        alignItems:'flex-end',
    },
    currectPrice:{
        alignSelf:'flex-end',
    },
    changePriceDiv:{
        flex:1,
        alignItems:'flex-end',
    },
    changePrice:{
        alignSelf:'flex-end',
    },
    percentageChangeDiv:{
        flex:1,
        alignItems:'flex-end',
    },
    percentageChange:{
      alignSelf:'flex-end' ,
      flex:1       
    }


});         