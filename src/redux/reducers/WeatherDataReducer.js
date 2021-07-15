import * as actiontypes from "../actions/ActionTypes";
import {initialState} from "./InitialState";


//weatherDataReducer is function that manupulates systemData in the initial state.
//in components we will access states by reducers.
//our actions returns json object consisting of type and payload.
//we will use our actions in reducers.
const weatherDataReducer=(state=initialState.weatherData,action)=>{

    let newState=state;

    if(action.type===actiontypes.GETWEATHERDATA){
       
            newState=action.payload;
            return newState
    }
    else{
        return newState
    }

}

export default weatherDataReducer;