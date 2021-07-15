import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter} from "react-router-dom";
import configureStore from "./redux/reducers/ConfigureStore";
import {Provider} from "react-redux";


//we need to assign our state store we named as configureStore to a variable.
export const Store=configureStore();

//now at first we will wrap <App/> with <BrowserRouter> in order to use react router which is used page roaming.
//then we will wrap <App/> with <Provider> in order to use redux.
//finally we will pass "Store" variable that we have just define above to provider as props below.

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
