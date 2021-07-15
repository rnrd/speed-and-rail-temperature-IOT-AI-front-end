import {combineReducers} from "redux";
import weatherDataReducer from "./WeatherDataReducer";
import loggerReducer from "./LoggerReducer";
import systemDataReducer from "./SystemDataReducer";

//we will combine all reducers together for redux by combineReducers function.
const allReducers=combineReducers(
    {
        weatherDataReducer,
        loggerReducer,
        systemDataReducer
    }
);

export default allReducers;