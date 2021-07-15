import * as actiontypes from "../actions/ActionTypes";
import {initialState} from "./InitialState";


//systemDataReducer is function that manupulates systemData in the initial state.
//in components we will access states by reducers.
//our actions returns json object consisting of type and payload.
//we will use our actions in reducers.
const systemDataReducer=(state=initialState.systemData,action)=>{

    let newState=state;

    if(action.type===actiontypes.GETSYSTEMDATA){
       
            newState=action.payload;
            return newState
    }
    else{
        return newState
    }

}

export default systemDataReducer;