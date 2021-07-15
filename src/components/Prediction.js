import React, { Component } from 'react';
import { connect } from "react-redux";
import "../css/Prediction.css";
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Container,Card,  CardTitle, Alert } from 'reactstrap';
import { MdWbSunny } from 'react-icons/md';
import { FaCloudRain } from 'react-icons/fa';
import { BsCloudFill } from 'react-icons/bs';
import { RiFoggyFill } from 'react-icons/ri';
import { GiSnowflake2 } from 'react-icons/gi';
import { FaTemperatureLow } from 'react-icons/fa';
import { verifyTokenFromAPI } from '../redux/actions/Actions';
import axios from "axios";


class Prediction extends Component {

  //This component send posts request and get ai decision data from the server
  
  //changeRoute function uses history parameter of props and change the page without refresh
  changeRoute = () => {
    this.props.history.push("/login");
  };

  //in componentDidMount lifecycle method we implement token control at first with verifyTokenFromAPI function(action) from redux
  //return of verifyTokenFromAPI function changes our isLoggedIn state(a reducer of redux) to true if token is valid.
  //otherwise changeRoute function brings us to login page
  //componentDidMount will be called just after the parent and all children components mount
  componentDidMount() {
    this.props.verifyTokenFromAPI();
    if (this.props.isLoggedIn === false) {
      this.changeRoute();
      console.log("islogged: " + this.props.isLoggedIn);
    } else {
      console.log("log is " + this.props.isLoggedIn);
    }
  }

  //we will create a state variable that will only be used in this component not come from redux.
  //and initialize it.
  //then this varible will be updated with information that will come from user inputs.
  //and will send the server via a button
  state = {
    weatherTemperature: 0,
    weatherTemperatureFeel: 0,
    weatherTemperatureMin: 0,
    weatherTemperatureMax: 0,
    weatherHumidity: 0,
    weatherWindSpeed: 0,
    weatherWindDegree: 0,
    weatherType: "Clear",
    month: "January",
    hour: 0,
    success: null,
    prediction: 0,
  };

  //weatherTypeIcon function will update the state according to weather type that is choosen by user
  weatherTypeIcon = (type) => {
    switch (type) {
      case "Karlı":
        return this.setState({ weatherType: "Snow" });
      case "Yağmurlu":
        return this.setState({ weatherType: "Rain" });
      case "Bulutlu":
        return this.setState({ weatherType: "Clouds" });
      case "Sisli":
        return this.setState({ weatherType: "Mist" });
      default:
        return this.setState({ weatherType: "Clear" });
    }
  };
  

  //switchMonth function will update the state according to month that is choosen by user
  switchMonth=(month)=>{
    switch (month) {
      case "Ocak":
        return this.setState({ month: "January" });
      case "Şubat":
        return this.setState({ month: "February" });
      case "Mart":
        return this.setState({ month: "March" });
      case "Nisan":
        return this.setState({ month: "April" });
      case "Mayıs":
        return this.setState({ month: "May" });
      case "Haziran":
        return this.setState({ month: "June" });
        case "Temmuz":
        return this.setState({ month: "July" });
        case "Ağustos":
        return this.setState({ month: "August" });
        case "Eylül":
        return this.setState({ month: "September" });
        case "Ekim":
        return this.setState({ month: "October" });
        case "Kasım":
        return this.setState({ month: "November" });
      default:
        return this.setState({ month: "December" });
    }
  }

  //miison of handlePrediction function is to send post request to server.
  //this function will be asynchronous
  handlePrediction = async (e) => {
    try {
      //we should prevent the page refresh
      e.preventDefault();

      //this config variable is for post request header and will carry the token for verification in server.
      //if token is valid, the server will return result that we expect.
      //we load the token from local storage to Authorization key under headers key.
      const config={
        headers:{
            Authorization:localStorage.getItem("token")
        }
    };
      //now time to define url
      const url = "http://172.25.160.1:9000/prediction";
      //assign all state to postData variable
      var postData=this.state;
      //"success" key in state variable is for alert message so we need to delete this.
      //because server does not need this.
      delete postData["success"];
      //Also prediction variable is not necessary for server
      delete postData["prediction"];
      //now we will send post and wait the response.
      const response = await axios.post(url,this.state,config);
      //server return json that includes "success" key. We assign this to result variable
      const result = response.data;
      //now update the state
      this.setState({ success: result.success });
      this.setState({ prediction: result.message });
      
    } catch (error) {
      console.log(error);
    }
  };

  //this function shows a alert message according to post request(server) return.
  //in handlePrediction function we update the "success" key of state with server return.
  //then we will use it here
  predictionAlert = () => {
    if (this.state.success === true) {
      return <Alert color="success">Tahmin başarılı.</Alert>;
    } else if (this.state.success === false) {
      return <Alert color="danger">Tahmin başarısız.</Alert>;
    } else {
      return (
        <FormText color="muted">
          İleri tarihli bir ray sıcaklığı tahminleyin.
        </FormText>
      );
    }
  };

  render() {
    return (
      <div className="prediction-main-div">
        <Container className="prediction-container-1">
          <Row>
            <Col sm="4" className="offset-4">
              <Card body inverse color="warning">
                <FaTemperatureLow
                  className="prediction-span-cardicon"
                  color="black"
                  size="3em"
                />
                <CardTitle className="prediction-cardtitle" tag="h5">
                  Öngörülen Ray Sıcaklığı
                </CardTitle>
                <span className="prediction-span-card">
                  <h2 className="prediction-h2-card">{this.state.prediction}</h2>
                </span>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="Prediction-container-2">
          <Form>
            <Row>
              <Col sm="3" className="offset-2">
                <FormGroup>
                  <Label for="weathertemp">Hava Sıcaklığı</Label>
                  <Input
                    type="text"
                    name="weathertemp"
                    id="weathertemp"
                    placeholder="Celcius derece"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ weatherTemperature: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="weatherfeel">Hissedilen Sıcaklığı</Label>
                  <Input
                    type="text"
                    name="weatherfeel"
                    id="weatherfeel"
                    placeholder="Celcius derece"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ weatherTemperatureFeel: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="humidity">Nem</Label>
                  <Input
                    type="text"
                    name="humidity"
                    id="humidity"
                    placeholder="% yüzde"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ weatherHumidity: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="weathermin">En Düşük Sıcaklık</Label>
                  <Input
                    type="text"
                    name="weathermin"
                    id="weathermin"
                    placeholder="Celcius derece"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ weatherTemperatureMin: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="3" className="offset-2">
              <FormGroup>
                  <Label for="weathermax">En Yüksek Sıcaklık</Label>
                  <Input
                    type="text"
                    name="weathermax"
                    id="weathermax"
                    placeholder="Celcius derece"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ weatherTemperatureMax: e.target.value });
                    }}
                  />
                  </FormGroup>
                <FormGroup>
                  <Label for="windspeed">Rüzgar Hızı</Label>
                  <Input
                    type="text"
                    name="windspeed"
                    id="windspeed"
                    placeholder="metre/saniye"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ weatherWindSpeed: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="winddegree">Rüzgar Açısı</Label>
                  <Input
                    type="text"
                    name="winddegree"
                    id="winddegree"
                    placeholder="Derece 0-360"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ weatherWindDegree: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="weathertype">
                    Gökyüzü
                    <span className="prediction-span-icon">
                      <MdWbSunny color="orange" size="1em" />
                    </span>
                    <span className="prediction-span-icon">
                      <FaCloudRain color="blue" size="1em" />
                    </span>
                    <span className="prediction-span-icon">
                      <BsCloudFill color="lightblue" size="1em" />
                    </span>
                    <span className="prediction-span-icon">
                      <RiFoggyFill color="gray" size="1em" />
                    </span>
                    <span className="prediction-span-icon">
                      <GiSnowflake2 color="coral" size="1em" />
                    </span>
                  </Label>
                  <Input
                    type="select"
                    name="weathertype"
                    id="weathertype"
                    onChange={(e) => {
                      e.preventDefault();
                      this.weatherTypeIcon(e.target.value);
                    }}
                  >
                    <option>Güneşli</option>
                    <option>Yağmurlu</option>
                    <option>Bulutlu</option>
                    <option>Sisli</option>
                    <option>Karlı</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="8" className="offset-2">
                <FormGroup>
                  <Label for="month">Ay</Label>
                  <Input
                    type="select"
                    name="month"
                    id="month"
                    onChange={(e) => {
                      e.preventDefault();
                      this.switchMonth(e.target.value);
                    }}
                  >
                    <option>Ocak</option>
                    <option>Şubat</option>
                    <option>Mart</option>
                    <option>Nisan</option>
                    <option>Mayıs</option>
                    <option>Haziran</option>
                    <option>Temmuz</option>
                    <option>Ağustos</option>
                    <option>Eylül</option>
                    <option>Ekim</option>
                    <option>Kasım</option>
                    <option>Aralık</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="8" className="offset-2">
                <FormGroup>
                  <Label for="hour">Saat</Label>
                  <Input
                    type="select"
                    name="hour"
                    id="hour"
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ hour: e.target.value });
                    }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>00</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="8" className="offset-2">
                <Button
                  block
                  className="default"
                  color="success"
                  size="xl"
                  onClick={(e) => {
                    e.preventDefault();
                    this.handlePrediction(e);
                  }}
                >
                  Gönder
                </Button>
                {this.predictionAlert()}
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
      isLoggedIn:state.loggerReducer,
      }
}

const mapDispatchToProps={
  verifyTokenFromAPI:verifyTokenFromAPI
}

export default connect(mapStateToProps,mapDispatchToProps)(Prediction)