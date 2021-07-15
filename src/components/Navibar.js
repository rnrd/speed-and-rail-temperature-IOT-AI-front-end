import React, { useState } from 'react';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {getLogOut} from "../redux/actions/Actions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrain } from 'react-icons/fa';
import "../css/Navibar.css";
import { withRouter } from "react-router-dom";

const Navi = (props) => {


  //Navibar will not have any states and will always be at the top of the page.
  //We have passed variable as props to this component and this props includes history information.

  //this part is for toggle button of navbar:
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  //here comes the ui logic
  //with useSelector we acces the the state about the loging in redux.
  const isLogged=useSelector(state=>state.loggerReducer, shallowEqual);
  //with useDispatch we will access redux functions(actions)
  const logDispatch = useDispatch();

  //we will define logOut function that catches the getLogOut action from redux.
  const logOut = () => {
    logDispatch(getLogOut());
  }

  //we will manage the log condition
  const handleLog=()=>{
    if(isLogged===false){
      return(
        <NavLink className="nav-links" href="/login">Giriş </NavLink> 
      )
    }
    else{
      return(
        <NavLink className="nav-links" onClick={()=>logOut()} href="/" >Çıkış</NavLink>
      )
    }
  }
  
  return (
    <div className="navbar-div" fixed="top">
      <Navbar className="nav-bar"  light expand="md">
        <NavbarBrand href="/">
          <FaTrain color="white" size="2em" />
        </NavbarBrand>
        <NavbarToggler className="navbar-toggler" onClick={toggle} />
        <Collapse  className="navbar-toggler-collapse" isOpen={isOpen} navbar>
          <Nav className="nav mr-auto" navbar>
            <NavItem className="nav-items">
              <NavLink className="nav-links" onClick={(e)=>{
                e.preventDefault()
                props.history.push("/")}}>Anasayfa</NavLink>
            </NavItem>
            <NavItem className="nav-items">
              <NavLink className="nav-links" onClick={(e)=>{
                e.preventDefault()
                props.history.push("/dashboard")}} >Paneli Yönet</NavLink>
            </NavItem>
            <NavItem className="nav-items">
              <NavLink className="nav-links" onClick={(e)=>{
                e.preventDefault()
                props.history.push("/prediction")}}>Tahminle</NavLink>
            </NavItem>
            <NavItem className="nav-items">
              <NavLink className="nav-links" onClick={(e)=>{
                e.preventDefault()
                props.history.push("/signup")}}>Kaydol</NavLink>
            </NavItem>
            <NavItem>
              {handleLog()}
            </NavItem>
          </Nav>
          <NavbarText className="nav-text">
            Ege Üniversitesi Makina Mühendisliği
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

//Because of Navi component is not in react-router switch:
//we should use withRouter high order function in order to implement routing without page refresh
export default withRouter(Navi);