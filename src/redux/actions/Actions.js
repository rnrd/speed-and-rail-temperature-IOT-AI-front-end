import *  as actiontypes from  "./ActionTypes";
import axios from "axios";
import {initialState} from "../reducers/InitialState";

//Here we will define actions and the other functions that return action.
//Actions will return a json and according our model:
//json keys will be type(action type) and payload.
//these actions will be input for reducers later.


//we will begin with getWeatherData action.
//this action will get a parameter that we named data.
export const getWeatherData=(data)=>{
    return {
        type: actiontypes.GETWEATHERDATA,
        payload: data
    }
}

//getWeatherDataFromAPI is a high order function that return getWeatherData action.
//in this function we will make get request to API, API will return data and we pass this data to action.
export const getWeatherDataFromAPI=()=>{
    //we will pass no parameter to this function
    //Also this function will return an asynchronous ananoymous function that takes dispatch parameter.
    //dispacth parameter is about redux and it will wrap getWeatherData action.
    //thanks to this parameter: Although the real action is getWeatherData,
    //we can use getWeatherDataFromAPI instead of getWeatherData in react components.
    //The reason of all of these codes is redux raw actions are not asynchronous.
    //So we need a middleware so we use redux thunk module in this project.(pls see ConfigureStore.js)
    return async function (dispatch){
          try {

            //this config variable is for get request header and will carry the token for verification in server.
            //if token is valid, the server will return result that we expect.
            //we load the token from local storage to Authorization key under headers key.
            const config={
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            };
            //let's define URL
            const url="http://172.25.160.1:9000/dashboard/weather";
            //now make get request and wait for response.
            const response= await axios.get(url,config);
            //response is not consist of only data.
            //so we need to assign data part of response to another variable.
            const result=response.data;
            //then assign all variable according to our initial state
            const Sky=result.weatherType;
            const Humidity=result.weatherHumidity;
            const Temp=result.weatherTemperature;
            const Temp_Feel=result.weatherTemperatureFeel;
            const Wind_Speed=result.weatherWindSpeed;
            const Wind_Degree=result.weatherWindDegree;
            //and gather all variables in a json
                const data={
                    Sky,
                    Humidity,
                    Temp,
                    Temp_Feel,
                    Wind_Speed,
                    Wind_Degree
                }
            //finally return to getWeatherData action in dispatch and pass our json data to this action.
            //now our function is ready to be used in a reducer.
            return dispatch(getWeatherData(data))
          } catch (error) {
            console.log(error)
	        return dispatch(getSystemData(initialState.weatherData));
          } 
            
        }
    
}


//logIn action is for login/logout states of user.
//according to user log state we adjust the page permitions.
//this action will be used in a reducer that manupulates isLoggedIn state in initial state.
//this action will get a parameter that we named data.
export const logIn=(data)=>{
    return {
        type: actiontypes.LOGIN,
        payload: data
    }
}

//getLogInResultFromAPI is a high order function that return logIn action.
//in this function we will make post request to API, API will return data and we pass this data to action.
export const getLogInResultFromAPI=(userInfo)=>{
    //we will pass userInfo to this function as a parameter coming from user such as email and password.
    //Also this function will return an asynchronous ananoymous function that takes dispatch parameter.
    //dispacth parameter is about redux and it will wrap logIn action.
    //thanks to this parameter: Although the real action is logIn,
    //we can use getLogInResultFromAPI instead of logIn in react components.
    //The reason of all of these codes is redux raw actions are not asynchronous.
    //So we need a middleware so we use redux thunk module in this project.(pls see ConfigureStore.js)
    return async function (dispatch){
        try {
            //in order to log in, we do not need to do token check in server.
            //after log in action is done succesfully we will get token then we will use this token for access pages.
            //therefore we will not use header config for post request.

            //let's define URL
            const url="http://172.25.160.1:9000/login";
            //now make post request and wait for response.
            const response= await axios.post(url,userInfo);
            //response is not consist of only data.
            //so we need to assign data part of response to another variable.
            const result=response.data;
            //in result variable will be a json now that has both success and access_token keys.
            //success corresponds to a boolean value.
            //let's assign this value to a new variable.
            const data=result.success
            //access_token is a json web token as a string
            //we will assign access_token to a variable.
            const newToken=result.access_token;
            //and save the token to local storage.
            localStorage.setItem("token",newToken);
            //finally return to logIn action in dispatch and pass the variable "data" to this action.
            //now our function is ready to be used in a reducer.
            return dispatch(logIn(data))
        } catch (error) {
            console.log(error)
	        localStorage.setItem("token"," ");
            return dispatch(logIn(false))	
        }
    }
}


//logOut action is for login/logout states of user.
//according to user log state we adjust the page permitions.
//this action will be used in a reducer that manupulates isLoggedIn state in initial state.
//this action will get a parameter that we named data.
export const logOut=(data)=>{
    return {
        type: actiontypes.LOGOUT,
        payload: data
    }
}

//getLogOut is a high order function that return logIn action.
//in this function we will make get request to API, API will return data and we pass this data to action.
export const getLogOut=()=>{
    //we will pass no parameter to this function
    //Also this function will return an asynchronous ananoymous function that takes dispatch parameter.
    //dispacth parameter is about redux and it will wrap logOut action.
    //thanks to this parameter: Although the real action is logOut,
    //we can use getLogOut instead of logOut in react components.
    //The reason of all of these codes is redux raw actions are not asynchronous.
    //So we need a middleware so we use redux thunk module in this project.(pls see ConfigureStore.js)
    return async function(dispatch){
        try {
            //in order to log out, we do not need to do token check in server.
            //therefore we will not use header config for get request.

            //let's define the URL
            const url="http://172.25.160.1:9000/logout";
            //now make get request and wait for response.
            const response= await axios.get(url);
            //response is not consist of only data.
            //so we need to access data part of response to another variable.
            //and we will assign success key of data which is a json object to a variable.
            const result=response.data.success;
            //server will return an empty token to prevent access to pages of web site without log in.
            //so we will set this empty token to local storage.
            localStorage.setItem("token"," ");
            //finally return to logOut action in dispatch and pass the variable "result" to this action.
            //now our function is ready to be used in a reducer.
            return dispatch(logOut(result))
            
        } catch (error) {
            console.log(error)
	        localStorage.setItem("token"," ");
	        return dispatch(logOut(true))
        }
    }
}


//verifyToken action is for login/logout states of user.
//if the user has already logged in , it means that the user has a valid token.
//in every page enterance:
// we will smake get request to server and check if the token exists and is valid(if token's time duration is expired, then token is invalid)
//this action will be used in a reducer that manupulates isLoggedIn state in initial state.
//this action will get a parameter that we named data.
export const verifyToken=(data)=>{
    return {
        type: actiontypes.VERIFYTOKEN,
        payload: data
    }
}

//verifyTokenFromAPI is a high order function that return logIn action.
//in this function we will make get request to API, API will return data and we pass this data to action.
export const verifyTokenFromAPI=()=>{
    //we will pass no parameter to this function
    //Also this function will return an asynchronous ananoymous function that takes dispatch parameter.
    //dispacth parameter is about redux and it will wrap verifyToken action.
    //thanks to this parameter: Although the real action is verifyToken,
    //we can use verifyTokenFromAPI instead of logOut in react components.
    //The reason of all of these codes is redux raw actions are not asynchronous.
    //So we need a middleware so we use redux thunk module in this project.(pls see ConfigureStore.js)
    return async function(dispatch){
        try {
            //this config variable is for get request header and will carry the token for verification in server.
            //if token is valid, the server will return result that we expect.
            //we load the token from local storage to Authorization key under headers key.
            const config={
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            };

            //let's define the URL
            const url="http://172.25.160.1:9000/verify";
            //now make get request and wait for response.
            const response= await axios.get(url,config);
            //response is not consist of only data.
            //so we need to access data part of response to another variable.
            //and we will assign success key of data which is a json object to a variable.
            const result=response.data.success;
            console.log("verify token result "+result)
            if(result===false){
                localStorage.setItem("token"," ");
            }
            //finally return to verifyToken action in dispatch and pass the variable "result" to this action.
            //now our function is ready to be used in a reducer.
            return dispatch(verifyToken(result))
            
        } catch (error) {
            console.log(error)
	        //if error happens we will set empty token to local storage.
            localStorage.setItem("token"," ");
	        return dispatch(verifyToken(false))
        }
    }
}



//getSystemData action is for system data state
//this action will get a parameter that we named data.
export const getSystemData=(data)=>{
    return {
        type: actiontypes.GETSYSTEMDATA,
        payload: data
    }
}

//getSystemDataFromAPI is a high order function that return getSystemData action.
//in this function we will make get request to API, API will return data and we pass this data to action.
export const getSystemDataFromAPI=()=>{
    //we will pass no parameter to this function
    //Also this function will return an asynchronous ananoymous function that takes dispatch parameter.
    //dispacth parameter is about redux and it will wrap getSystemData action.
    //thanks to this parameter: Although the real action is getSystemData,
    //we can use getSystemDataFromAPI instead of getSystemData in react components.
    //The reason of all of these codes is redux raw actions are not asynchronous.
    //So we need a middleware so we use redux thunk module in this project.(pls see ConfigureStore.js)
    return async function (dispatch){
          try {

            //this config variable is for get request header and will carry the token for verification in server.
            //if token is valid, the server will return result that we expect.
            //we load the token from local storage to Authorization key under headers key.
            const config={
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            };
            
            //Let's define the URL
            const url="http://172.25.160.1:9000/dashboard";
            //now make get request and wait for response.
            const response= await axios.get(url,config);
            //response is not consist of only data.
            //so we need to assign data part of response to another variable.
            const result=response.data;

            //now we will manipulate data in the variable "result"
            //and construct a new array named fullData by for loop
            var fullData=[];
            for(let i=0;i<5;i++){
                
                    let {
                        start,
                        direction,
                        temperature,
                        temperatureValidation,
                        speed,
                        counter_1,
                        counter_2,
                        hour,
                        minute
                        }=result[i];
                    
                    let deviation=Math.abs(temperature-temperatureValidation);
                    let roundedDeviation=Math.round(deviation*100)/100;

                    let data={
                        start,
                        direction,
                        temperature,
                        temperatureValidation,
                        speed,
                        counter_1,
                        counter_2,
                        roundedDeviation,
                        hour,
                        minute
                    }

                fullData.push(data)
                    
            }

            //finally return to getSystemData action in dispatch and pass the variable "fullData" to this action.
            //now our function is ready to be used in a reducer.
            return dispatch(getSystemData(fullData))
          } catch (error) {
            console.log(error)
	        return dispatch(getSystemData(initialState.systemData));
          } 
            
        }
    
}