import * as actionTypes from '../actions/types'
import { combineReducers } from 'redux';

const initalUserState={
    currentUser:null,
    isLoading:true
};

export const user_reducer=(state=initalUserState,action)=>{
    switch(action.type){
        case actionTypes.SET_USER:
            return{
               currentUser: action.payload.currentUser,
               isLoading:false
            }
            case actionTypes.Clear_USER:
                return {
                    currentUser:null,
                    isLoading:false
                }
            default:
                return state;
    }
}
const initalChannelState={
    currentChannel:null
};

export const channelReducer=(state=initalChannelState,action)=>{
    switch(action.type){
        case actionTypes.SET_CURRENT_CHANNEL:
            return{
                
                currentChannel:action.payload.currentChannel
            }
            default:
                return state;
    }
}
const rootReducer= combineReducers({
    user:user_reducer,
    channel:channelReducer
});
export default rootReducer