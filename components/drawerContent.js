import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet, ScrollView, Image
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import {liveNseData,liveBseData,liveNseBseData} from '../src/actions'

var nseData = {};
var bseData = {};
var axios = require('axios');
var bseUrl = 'https://api.bseindia.com/bseindia/api/Sensex/getSensexData?json={"fields":"2,3,4,5,6,7"}';
var API = require('indian-stock-exchange');
var NSEAPI = API.NSE;
const timer = require('react-native-timer');
import {connect} from 'react-redux';

const LiveNseBseData = (props) => {
  if (props.nseData && props.nseData[0]) {
    let niftyData = props.nseData[0];
    let bseData = props.bseData[0];
    let colourIndicator;
    if (parseInt(niftyData.last.replace(',', '')) >= parseInt(niftyData.previousClose.replace(',', ''))) {
      colourIndicator = styles.backgroundGreen;
    } else {
      colourIndicator = styles.backgroundRed;
    }
    return (
      <View style={styles.marketDiv}>
      <View style={styles.parentView}>
        <View style={Object.assign({}, styles.colourIndicator, colourIndicator)}></View>
        <View style={styles.childView}>
          <Text style={styles.marketIndicatorText}>NIFTY 50</Text>
          {niftyData ?
            <Text style={styles.ltpText}>{niftyData.last}</Text>
            : <Text>No Data</Text>
          }
          <Text style={styles.percentageChangeText}>{(parseFloat(niftyData.last.replace(',', '')) - parseFloat(niftyData.previousClose.replace(',', ''))).toFixed(2)
            + '  (' + niftyData.percChange + '%)'}</Text>
        </View>
      </View>
      <View style={styles.parentViewSensex}>
      <View style={Object.assign({}, styles.colourIndicator, colourIndicator)}></View>
        <View style={styles.childView}>
          <Text style={styles.marketIndicatorText}>SENSEX</Text>
            <Text style={styles.ltpText}>{bseData.ltp.replace('+', '')}</Text>
          <Text style={styles.percentageChangeText}>{bseData.chg.replace('+', '') + '  (' + bseData.perchg.replace('+', '')  + '%)'}</Text>
        </View>
      
      </View>
      </View>
    )
  } else {
    return (
      <Text>No Data</Text>
    )
  }
};

class customDrawerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nseLive: nseData,
      bseLive: bseData
    }
  }

  componentDidMount() {
    timer.setInterval(this, 'liveData', () => {
      this.props.dispatch(liveNseBseData());
    }, 120000);
  }
  componentWillMount() {
    this.props.dispatch(liveNseBseData());
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 120, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/images/mario1.png')} style={{ height: 80, width: 80 }} />
        </View>
        <LiveNseBseData nseData={this.props.nseLive} bseData={this.props.bseLive} />
        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marketDiv: {
    borderTopWidth:1,
    borderTopColor: '#f2f2f2',
    borderBottomWidth:1,
    borderBottomColor: '#f2f2f2', 
    padding:10, 
    flexDirection: 'row',
  },
  parentView: {
    justifyContent:'flex-start',
    marginLeft: 20,
    flexDirection: 'row',
  },
  parentViewSensex: {
    justifyContent:'flex-end',
    marginLeft: 20,
    flexDirection: 'row',
  },
  childView: {
    flexDirection: 'column',
  },
  colourIndicator: {
    marginRight: 5,
    height: 50,
    width: 8,
  },
  backgroundGreen: {
    backgroundColor: '#077a18',
  },
  backgroundRed: {
    backgroundColor: '#ea0404',
  },
  marketIndicatorText:{
    color:  '#404040',
    fontSize: 12,
  },
  ltpText:{
    color:  '#404040',
    fontWeight: '600',
    
  },
  percentageChangeText:{
    color:  '#404040',
    fontWeight: '400',
    fontSize: 12,
  }
});

const mapStateToProps = (state) => {
return {
  nseLive : state.liveDataNseBse.nseLive ,
  bseLive : state.liveDataNseBse.bseLive
}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLiveNseBseData : () => dispatch (liveNseBseData())
  }
}

export default connect(mapStateToProps)(customDrawerComponent);