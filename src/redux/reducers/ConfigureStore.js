import { createStore,applyMiddleware } from 'redux';
import allReducers from "./ReducersIndex";
import thunk from "redux-thunk";


//now we will define a function that return createStore function and it will be redux state store.
//thanks to this function we will bind all reducers to redux.
//also we know that redux raw actions are not asynchronous.
//So we need a middleware so we use redux thunk module in this project.
//we will use applyMiddleware function and pass "thunk" as a parameter in it.
export default function configureStore() {

    return createStore(allReducers,applyMiddleware(thunk))
}