import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Container, Alert } from 'reactstrap';
import "../css/Login.css";
import Link from 'react-router-dom/Link';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {useEffect, useState} from "react";
import {getLogInResultFromAPI} from "../redux/actions/Actions";



const Login = (props) => {

  //Login component will use both redux functions(actions) and its own states.


  //props were passed to component above.
  //changeRouteForgotPassword function uses history parameter of props and change the page without refresh
  const changeRouteForgotPassword = (e) => {
    e.preventDefault();
    props.history.push("/forgotpassword");
  }

  //useSelector is used to access loggerReducer which manupulates isLoggedIn state in our redux initial state.
  //here shallowequal implements equality checks and prevent unneccessary re-render.
  const isLogged=useSelector(state=>state.loggerReducer, shallowEqual);
  //for email and password we will define states. These states will be updated by user inputs.
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  //we will define a state to modify alerts
  const [alertModifyNumber, setAlertModifyNumber]=useState(3);
  
  //we will assign useDispatch to a variable in order to acces redux functions(actions)
  const logDispatch = useDispatch();


  //handleLogIn function handle the login stuff
  const handleLogIn=async (e)=>{
    //at first we should prevent page refresh due to user inputs
    e.preventDefault();
    //we will define an object that includes user input parameters
    //email and password are updated by the functions running in buttons onChange props.
    const userInfo={
      email,
      password
    }
    //then we will call getLogInResultFromAPI function(action) that handles post request
    await logDispatch(getLogInResultFromAPI(userInfo));
    if(logDispatch(getLogInResultFromAPI(userInfo))===true)
    {
      alertModifier(true)
    }
    else{
      alertModifier(false)
    }
  }



  //according to signUpSuccess state we will show alert.
  const alertModifier=()=>{
    if(isLogged===true){
      setAlertModifyNumber(1)
      setTimeout(() => {
        setAlertModifyNumber(3)
      }, 4000);
    }
    else {
      
      setAlertModifyNumber(2)
      setTimeout(() => {
        setAlertModifyNumber(3)
      }, 4000);
    }
  }

  const alertState = () => {
    switch (alertModifyNumber) {
      case 1:
        return (

          <FormText color="muted">
            <Alert color="success">
              Giriş başarılı.
            </Alert>
          </FormText>
          
      );
      case 2:
        return (
          <FormText className="alertstate" color="muted">
            <Alert color="danger">
              İşlem başarısız oldu. Lütfen tekrar deneyiniz.
            </Alert>
          </FormText>
      );
      case 3:
        return( 
          <FormText className="alertstate" color="muted">
            Bilgilerinizi asla üçüncü şahıslarla paylaşmıyoruz.
          </FormText>
        )
      default:
        return( 
          <FormText className="alertstate" color="muted">
            Bilgilerinizi asla üçüncü şahıslarla paylaşmıyoruz.
          </FormText>
        )
    }
  };

  //useEffect corresponds to componenDidMount, componentDidUpdate and componentWillUnmount lifecycle methods that are in class components.
  //if we give an empty array just after anonymous function inside useEffect, it works as componenDidMount
  //if we assign no array like below, useEffect works as componenDidMount and componentDidUpdate. It updates the page for each state changes.
  //if we assign an array and give a variable or function this array:
  //update will happen when each state change except that variable or function.
  //if we return the anonymous function of useEffect to another function:
  // useEffect works as componentWillUnmount additional to componenDidMount and componentDidUpdate.
  //in useEffect, we check isLogged state condition:
  useEffect(() => {

    if(isLogged===true){
      props.history.push("/");
    }
    
    })

  return (
    <div>
      <Container className="Login-container">
        <Row>
          <Col sm="4" className="justify-content-end offset-8">
              <Link to="/forgotpassword" className="justify-content-end" color="default" onClick={()=>changeRouteForgotPassword} >{isLogged} Şifrenizi unuttunuz mu?</Link>
          </Col>
        </Row>
        <Row>
          <Col sm="8" className="offset-2">
            <Form>
              <FormGroup>
                <Label for="LoginEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="LoginEmail"
                  placeholder="email@email.com"
                  onChange={(e)=>{
                    e.preventDefault()
                    setEmail(e.target.value)
                  }
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="LoginPassword">Şifre</Label>
                <Input
                  type="password"
                  name="Şifre"
                  id="LoginPassword"
                  placeholder="Şifrenizi giriniz."
                  onChange={(e)=>{
                    e.preventDefault()
                    setPassword(e.target.value)
                  }
                  }
                />
              </FormGroup>
              <Button block color="success" onClick={(e) =>handleLogIn(e)}>Gönder</Button>
              {alertState()}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;