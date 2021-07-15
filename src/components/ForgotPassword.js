import React from 'react';
import {useState} from "react";
//import {useEffect} from "react";
import "../css/ForgotPassword.css";
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Container, Alert } from 'reactstrap';
import axios from "axios";


const ForgotPassword = () => {

  //ForgotPassword component does not use redux but has its own states.

  //for email, validationkey and new password we will define states. These states will be updated by user inputs.
  const [email,setEmail]=useState("");
  const [validationKey,setValidationKey]=useState("");
  const [newPassword,setnewPassword]=useState("");
  //we also define signUpSuccess that will be updated by server return value
  const [signUpSuccess,setSignUpSuccess]=useState(null);
  //we will define a state to modify alerts
  const [alertModifyNumber, setAlertModifyNumber]=useState(3);


   //according to signUpSuccess state we will show alert.
   const alertModifier=(signUpData)=>{
    if(signUpData===true){
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
          <FormText className="alertstate" color="muted">
            <Alert color="success">
              Şifreniz değiştirilmiştir. Lütfen giriş yapınız.
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
          <FormText color="muted">
            Bilgilerinizi asla üçüncü şahıslarla paylaşmıyoruz.
          </FormText>
        )
      default:
        return( 
          <FormText color="muted">
            Bilgilerinizi asla üçüncü şahıslarla paylaşmıyoruz.
          </FormText>
        )
    }
  };
  

  //handleForgotPassword is a asynchronous function that handles post request
  const handleForgotPassword=async (e)=>{

    try {
    //at first we should prevent page refresh due to user inputs
      e.preventDefault();
    //we will define an object that includes user input parameters
    //email and password are updated by the functions running in buttons onChange props.
    const userInfo={
      email,
      validationKey,
      newPassword
    }
    //we should assign the url
    const url="http://localhost:9000/changepassword";
    //its time for post request. We will wait for result.
    const response= await axios.post(url,userInfo);
    //the return of server includes "success" variable that is boolean data. We will assign it to result variable.
    const result=response.data.success;
    console.log(result);
    //And we will update signUpSuccess state which we have already defined above.
    setSignUpSuccess(result)
    alertModifier(result)
    } catch (error) {
      console.log(error.message)
      console.log(error)
      setSignUpSuccess(false)
      return alertModifier(signUpSuccess)
    }
  }
  
  

 


  return (
    <div className="forgotpassword-main-div">
      <Container>
        <Row>
          <Col sm="8" className="offset-2">
            <Form>
              <FormGroup>
                <Label for="forgotpasswordEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="forgotpasswordEmail"
                  placeholder="email@email.com"
                  onChange={(e)=>{
                    e.preventDefault()
                    setEmail(e.target.value)
                  }
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="forgotpasswordOnay">Onay Anahtarı</Label>
                <Input
                  type="password"
                  name="Onay Anahtarı"
                  id="SignupOnay"
                  placeholder="Onay anahtarınızı giriniz."
                  onChange={(e)=>{
                    e.preventDefault()
                    setValidationKey(e.target.value)
                  }
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="forgotpasswordPassword">Yeni Şifre</Label>
                <Input
                  type="password"
                  name="Şifre"
                  id="forgotpasswordPassword"
                  placeholder="Şifrenizi giriniz."
                  onChange={(e)=>{
                    e.preventDefault()
                    setnewPassword(e.target.value)
                  }
                  }
                />
              </FormGroup>
              <Button block  color="success" onClick={(e) => handleForgotPassword(e)}>Gönder</Button>
              {alertState()}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPassword;