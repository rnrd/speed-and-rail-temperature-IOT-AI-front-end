import React from 'react';
import {useState} from "react";
import "../css/Signup.css";
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Container, Alert } from 'reactstrap';
import axios from "axios";

const SignUp = () => {

  //SignUp component does not use redux functions(actions) but has its own states.

  //for email, password, registerNumber and validationKey we will define states. These states will be updated by user inputs.
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [registerNumber,setRegisterNumber]=useState("");
  const [validationKey,setValidationKey]=useState("");
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
          <Alert color="danger">
          Kayıt oluşturuldu. Lütfen giriş yapınız.
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

  //handleSignUp is a asynchronous function that handles post request
  const handleSignUp=async (e)=>{
    try {
    //at first we should prevent page refresh due to user inputs
      e.preventDefault();
    //we will define an object that includes user input parameters
    //email and password are updated by the functions running in buttons onChange props.
    const userInfo={
      email,
      password,
      registerNumber,
      validationKey
    }
    //we should assign the url
    const url="http://localhost:9000/signup";
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
    <div className="Signup-main-div">
      <Container>
        <Row>
          <Col sm="8" className="offset-2">
            <Form>
              <FormGroup>
                <Label for="SignupEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="SignupEmail"
                  placeholder="email@email.com"
                  onChange={(e)=>{
                    e.preventDefault()
                    setEmail(e.target.value)
                  }
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="SignupPassword">Şifre</Label>
                <Input
                  type="password"
                  name="Şifre"
                  id="SignupPassword"
                  placeholder="Şifrenizi giriniz."
                  onChange={(e)=>{
                    e.preventDefault()
                    setPassword(e.target.value)
                  }
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="SignupSicil">Sicil No</Label>
                <Input
                  type="password"
                  name="Sicil No"
                  id="SignupSicil"
                  placeholder="Sicil numaranızı giriniz."
                  onChange={(e)=>{
                    e.preventDefault()
                    setRegisterNumber(e.target.value)
                  }
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="SignupOnay">Onay Anahtarı</Label>
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
              <Button block color="success" onClick={(e) => handleSignUp(e)}>Gönder</Button>
              {alertState()}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;