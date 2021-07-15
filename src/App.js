import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navi from "./components/Navibar";
import Homepage from "./components/Homepage";
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Prediction from "./components/Prediction";
import Dashboard from "./components/Dashboard";
import {Route,Switch} from "react-router-dom";
import { createBrowserHistory } from "history";

//in order to use history.push method to roam pages without page refresh we need to create BrowserHistory
//we will create BrowserHistory and assign it to a variale named "history"
//then we will pass this varible to first <div> of App as props below.
const history = createBrowserHistory();

//in order to make auth config for axios globally use the code  below:
//axios.defaults.headers.common['Authorization']=localStorage.getItem("token")
class App extends Component {
  
  render(){
    return (
      <div className="App" history={history}>
        <Navi />
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/forgotpassword" component={ForgotPassword}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/prediction" component={Prediction}/>
        </Switch>
        <div className="app-div">
          <Contact />
          <Footer />
        </div>
      </div>
    );
  }
  }
  

export default App;
