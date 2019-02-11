
export function liveNseBseData() {

    var axios = require('axios');
    var bseUrl = 'https://api.bseindia.com/bseindia/api/Sensex/getSensexData?json={"fields":"2,3,4,5,6,7"}';
    var API = require('indian-stock-exchange');
    var NSEAPI = API.NSE;
    
    return function(dispatch) {
        let nseData = {};
        let bseData = {};
        NSEAPI.getIndices()
        .then((response) => {
            nseData = response.data.data;
            return axios.get(bseUrl);
        }).then((bseResponse) => {
            bseData = bseResponse.data;
            dispatch({
                type: 'LIVE_NSE_BSE',
                nseLive: nseData,
                bseLive: bseData
            })
        }).catch((error) => { console.log(error) });
    }
}
export const liveNseData = (nseData) => ({
    type: 'LIVE_NSE',
    data: nseData
})

export const liveBseData = (bseData) => ({
    type: 'LIVE_BSE',
    data: bseData
}) 