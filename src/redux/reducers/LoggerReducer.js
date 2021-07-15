import * as actiontypes from "../actions/ActionTypes";
import {initialState} from "./InitialState";

//loggerReducer is function that manupulates isLogged in the initial state.
//in components we will access states by reducers.
//our actions returns json object consisting of type and payload.
//we will use our actions in reducers.
const loggerReducer=(state=initialState.isLogged,action)=>{

    let newState=state;
    if(action.type===actiontypes.LOGIN){
        if(action.payload===true){
            newState=true;
            return newState
        }
        else{
            newState=false;
            return newState
        }   
    }

    else if(action.type===actiontypes.LOGOUT){
        if(action.payload===true){
            newState=false;
            return newState
        }
        else{
            localStorage.setItem("token"," ");
            newState=false;
	        return newState
        }   
    }
    else if(action.type===actiontypes.VERIFYTOKEN){
        if(action.payload===true){
            newState=true;
            return newState
        }
        else{
            localStorage.setItem("token"," ");
            newState=false;
            return newState
        }
    }
    else{
            return newState
    }

}

export default loggerReducer;