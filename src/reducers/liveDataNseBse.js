const liveDataNseBse = (state={}, action) => {
    switch (action.type) {
        case 'LIVE_NSE_BSE':
        return {
            ...state,
            nseLive: action.nseLive,
            bseLive: action.bseLive,
        }
        case 'LIVE_NSE':
            return {
                ...state,
                nselive: action.data
            }
        case 'LIVE_BSE':
            return {
                ...state,
                bseLive:action.data
            }
        default:
            return state;
    }
};

export default liveDataNseBse;