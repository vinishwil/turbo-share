import React, { Component } from "react";
import { Header, Content, Picker, Form, Icon } from "native-base";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
class PickerForIndices extends Component {
    render() {
        return (
            <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down" />}
            headerStyle={{ backgroundColor: "#b95dd3" }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            selectedValue={this.props.selected}
            onValueChange={this.props.onValueChange} style={styles.pickerStyle}
        >
            <Picker.Item label="Nifty 50" value="Nifty50" />
            <Picker.Item label="Nifty Next 50" value="NiftyNext50" />
            <Picker.Item label="Nifty Bank" value="NiftyBank" />
            <Picker.Item label="Nifty Auto" value="NiftyAuto" />
            <Picker.Item label="Nifty Energy" value="NiftyEnergy" />
            <Picker.Item label="Nifty Fin Service" value="NiftyFinService" />
            <Picker.Item label="Nifty FMCG" value="NiftyFmcg" />
            <Picker.Item label="Nifty IT" value="NiftyIt" />
            <Picker.Item label="Nifty Media" value="NiftyMedia" />
            <Picker.Item label="Nifty Metal" value="NiftyMetal" />
            <Picker.Item label="Nifty Pharma" value="NiftyPharma" />
            <Picker.Item label="Nifty PSU Bank" value="NiftyPsuBank" />
            <Picker.Item label="Nifty Reality" value="NiftyReality" />
            <Picker.Item label="Nifty PVT Bank" value="NiftyPvtBank" />
        </Picker>
        );
    }
}
export default PickerForIndices;

const styles = StyleSheet.create({
    pickerStyle: {
        width: '100%',
        backgroundColor: '#ddd',
    }
});