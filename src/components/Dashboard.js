import React, { Component } from 'react';
import "../css/Dashboard.css";
import { Col, Row, Container,Card, CardTitle, CardSubtitle} from 'reactstrap';
import { VscDebugStart } from 'react-icons/vsc';
import { BiDirections } from 'react-icons/bi';
import { FaTemperatureLow } from 'react-icons/fa';
import { AiOutlineCalculator } from 'react-icons/ai';
import { GiCartwheel } from 'react-icons/gi';
import { IoMdSpeedometer } from 'react-icons/io';
import { ImLocation } from 'react-icons/im';
import { ImStop2 } from 'react-icons/im';
import { MdWbSunny } from 'react-icons/md';
import { FaCloudRain } from 'react-icons/fa';
import { BsCloudFill } from 'react-icons/bs';
import { RiFoggyFill } from 'react-icons/ri';
import { GiSnowflake2 } from 'react-icons/gi';
import { WiHumidity } from 'react-icons/wi';
import { FiWind } from 'react-icons/fi';
import { TiLocationArrow } from 'react-icons/ti';
import TempChart from "./TempChart";
import SpeedChart from "./SpeedChart";
import { connect } from "react-redux";
import {getWeatherDataFromAPI, verifyTokenFromAPI,getSystemDataFromAPI} from "../redux/actions/Actions";

//This definition is to enable cleaning interval requests are being sent by the functions which will be defined. 
//the definition below is applying to window beacuse we want to clear interval requests when the page is changed.
const {clearTimeout, setTimeout} = window;


//this component will switch o the page by react router

class Dashboard extends Component {

    //in order to get data periodically, we will use state belong to this component not redux
    //systemInterval=0;
    //weatherInterval=0;
    


    //in order to get system data periodically, we will use this function
    systemTimeOut=()=>{
        const interval=20*1000/2;
        setTimeout(() => {
            this.props.getSystemDataFromAPI();
            console.log("I am here")
        }, interval);
    }
    


    //in order to get weather data periodically, we will use this function
    weatherTimeOut=()=>{
        if(this.props.isLoggedIn===true){
           const interval=20*1000/2;
           setTimeout(() => {
               this.props.getWeatherDataFromAPI()
           }, interval);
        }
    }
   

    //in componentDidMount lifecycle method we implement token control at first with verifyTokenFromAPI function(action) from redux
    //return of verifyTokenFromAPI function changes our isLoggedIn state(a reducer of redux) to true if token is valid.
    //otherwise changeRoute function brings us to login page
    //when token is valid then getWeatherDataFromAPI, getSystemDataFromAPI, systemTimeOut, weatherTimeOut functions will be proceeded.
    //componentDidMount will be called just after the parent and all children components mount
    componentDidMount(){
        //at first we use verifyTokenFromAPI redux function(action) that we defined in mapdispatchToProps at the bottom of page 
        this.props.verifyTokenFromAPI();
        //then we access  isLoggedIn:state.loggerReducer that we defined in mapStateToProps at the bottom of page 
        //and control the condition
        if(this.props.isLoggedIn===false){
            this.changeRoute()
            console.log("islogged: "+this.props.isLoggedIn)
        }
        else{
            //then we use getWeatherDataFromAPI and getSystemDataFromAPI redux function(action):
            // that we defined in mapdispatchToProps at the bottom of page 
            this.props.getWeatherDataFromAPI();
            this.props.getSystemDataFromAPI();
            console.log(this.props.systemData[0].temperature);
            console.log("islogged: "+this.props.isLoggedIn);
            this.systemTimeOut()
            //this.weatherTimeOut()
            
        }
    }

    componentWillUnmount(){
        clearTimeout(this.systemTimeOut)
        clearTimeout(this.weatherTimeOut)
        console.log("unmounted")   
    }




    //this function uses history parameter of props and change the page without refresh
    changeRoute = () => {
        this.props.history.push("/login")
    }

     
    //this functions determines the system start/stop card items according to system data
    SystemState=()=>{
        if(this.props.systemData[0].start===true){
            return (
                <Card body inverse className="dashboard-card">
                    <VscDebugStart className="dashboard-card-1-cardicon" color="green" size="2em"/> 
                    <CardTitle className="dashboard-card-cardtitle" tag="h4">Sistem Durumu</CardTitle>
                    <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">Start</CardSubtitle>
                </Card>
            )
        }
        
        else{
            return (
                <Card body inverse className="dashboard-card">
                    <ImStop2 className="dashboard-card-7-cardicon" color="red" size="2em"/> 
                    <CardTitle className="dashboard-card-cardtitle" tag="h4">Sistem Durumu</CardTitle>
                    <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">Stop</CardSubtitle>
                </Card>
            )
        }
    }

    //this functions determines the system weather type icons card items according to weather data
    weatherTypeIcon=(weatherType)=>{
        switch(weatherType) {
            case "Snow":
              return(
                <GiSnowflake2 className="weatherTypeIcon" color="coral" size="3em" />
              )
            case "Rain":
            return(
                <FaCloudRain className="weatherTypeIcon" color="lightskyblue" size="2em" />
              )
            case "Clouds":
            return(
                <BsCloudFill className="weatherTypeIcon" color="lightblue" size="2em" />
              )
            case "Mist":
            return(
                <RiFoggyFill className="weatherTypeIcon" color="gray" size="2em" />
              )

            case "Fog":
            return(
                <RiFoggyFill className="weatherTypeIcon" color="gray" size="2em" />
              )
            default:
              return(
                <MdWbSunny className="weatherTypeIcon" color="orange" size="2em" />
              )
          }
    }

    //this functions determines the system weather text card items according to weather data
    weatherTypeText=(weatherType)=>{
        switch(weatherType) {
            case "Snow":
              return(
                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">Karlı</CardSubtitle>
              )
            case "Rain":
            return(
                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">Yağmurlu</CardSubtitle>
              )
            case "Clouds":
            return(
                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">Bulutlu</CardSubtitle>
              )
            case "Mist":
            return(
                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">Sisli</CardSubtitle>
              )
            case "Fog":
            return(
                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">Sisli</CardSubtitle>
            )
            default:
              return(
                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">Açık</CardSubtitle>
              )
          }
    }
    
   //here we mutate the initial state of system to stateSystemData variable
    stateSystemData=this.props.systemData;

    render() {
       //in order not to render child components with null state, we need another assignment
       //then we pass this stateSystemData variable to TempChart and SpeedChart as props
       this.stateSystemData=this.props.systemData;
       console.log(this.stateSystemData)
        return (
            <div className="dashboard-main-div">
                <Container className="dashboard-main-container">
                    <h2>Sistem Parametreleri</h2>
                    <Row className="dashboard-row-1">
                        <Col sm="3" className="dashboard-col-1">
                            {this.SystemState()}
                            <Card body inverse className="dashboard-card">
                                <BiDirections className="dashboard-card-2-cardicon" color="steelblue" size="2em"/> 
                                <CardTitle className="dashboard-card-cardtitle" tag="h4">Tren Yönü</CardTitle>
                                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle ">{this.props.systemData[0].direction===true ? "Aliağa":"Cumaovası"}</CardSubtitle>
                            </Card>
                        </Col>
                        <Col sm="3" className="dashboard-col-2">
                            <Card body inverse className="dashboard-card">
                                <FaTemperatureLow className="dashboard-card-3-cardicon" color="orange" size="2em"/> 
                                <CardTitle className="dashboard-card-cardtitle" tag="h4">Ray Sıcaklığı</CardTitle>
                                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">{this.props.systemData[0].temperature}</CardSubtitle>
                            </Card>
                            <Card body inverse className="dashboard-card">
                                <AiOutlineCalculator className="dashboard-card-4-cardicon" color="coral" size="2em"/> 
                                <CardTitle className="dashboard-card-cardtitle" tag="h4">Ölçüm Farkı</CardTitle>
                                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle ">{this.props.systemData[0].roundedDeviation}</CardSubtitle>
                            </Card>
                        </Col>
                        <Col sm="3" className="dashboard-col-3">
                            <Card body inverse className="dashboard-card">
                                <GiCartwheel className="dashboard-card-5-cardicon" color="black" size="2em"/> 
                                <CardTitle className="dashboard-card-cardtitle" tag="h4">Dingil Sayıcı</CardTitle>
                                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">{this.props.systemData[0].counter_1}</CardSubtitle>
                            </Card>
                            <Card body inverse className="dashboard-card">
                                <GiCartwheel className="dashboard-card-6-cardicon" color="black" size="2em"/> 
                                <CardTitle className="dashboard-card-cardtitle" tag="h4">Dingil Sayıcı</CardTitle>
                                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle ">{this.props.systemData[0].counter_1}</CardSubtitle>  
                            </Card>
                        </Col>
                        <Col sm="3" className="dashboard-col-4">
                            <Card body inverse className="dashboard-card">
                                <IoMdSpeedometer className="dashboard-card-5-cardicon" color="crimson" size="2em"/> 
                                <CardTitle className="dashboard-card-cardtitle" tag="h4">Tren Hızı</CardTitle>
                                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">{this.props.systemData[0].speed}</CardSubtitle>
                            </Card>
                            <Card body inverse className="dashboard-card">
                                <ImLocation className="dashboard-card-6-cardicon" color="teal" size="2em"/> 
                                <CardTitle className="dashboard-card-cardtitle" tag="h4">Konum</CardTitle>
                                <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle ">İzmir</CardSubtitle>  
                            </Card>
                        </Col>
                    </Row>
                    <Card className="dashboard-card-weather">
                        <Container className="dashboard-container-weather">
                        <h2>Hava Koşulları</h2>
                            <Row className="dashboard-row-2">  
                                <Col sm="4" className="dashboard-weather-col-1">
                                    <Card body inverse className="dashboard-card">
                                         {this.weatherTypeIcon(this.props.weatherData.Sky)}
                                        <CardTitle className="dashboard-card-cardtitle" tag="h4">Gökyüzü</CardTitle>
                                        {this.weatherTypeText(this.props.weatherData.Sky)}
                                    </Card>
                                    <Card body inverse className="dashboard-card">
                                        <WiHumidity className="weatherTypeIcon" color="teal" size="2em"/> 
                                        <CardTitle className="dashboard-card-cardtitle" tag="h4">Nem</CardTitle>
                                        <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle ">{this.props.weatherData.Humidity}</CardSubtitle>  
                                    </Card>
                                </Col>
                                <Col sm="4" className="dashboard-weather-col-2">
                                    <Card body inverse className="dashboard-card">
                                        <FaTemperatureLow className="weatherTypeIcon" color="orange" size="2em"/>  
                                        <CardTitle className="dashboard-card-cardtitle" tag="h4">Sıcaklık</CardTitle>
                                        <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">{this.props.weatherData.Temp}</CardSubtitle>
                                    </Card>
                                    <Card body inverse className="dashboard-card">
                                        <FaTemperatureLow className="weatherTypeIcon" color="red" size="2em"/> 
                                        <CardTitle className="dashboard-card-cardtitle" tag="h4">Hissedilen</CardTitle>
                                        <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle ">{this.props.weatherData.Temp_Feel}</CardSubtitle>  
                                    </Card>
                                </Col>
                                <Col sm="4" className="dashboard-weather-col-3">
                                    <Card body inverse className="dashboard-card">
                                        <FiWind className="weatherTypeIcon" color="steelblue" size="2em"/>  
                                        <CardTitle className="dashboard-card-cardtitle" tag="h4">Rüzgar Hızı</CardTitle>
                                        <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle">{this.props.weatherData.Wind_Speed}</CardSubtitle>
                                    </Card>
                                    <Card body inverse className="dashboard-card">
                                        <TiLocationArrow className="weatherTypeIcon" color="slategray" size="2em"/> 
                                        <CardTitle className="dashboard-card-cardtitle" tag="h4">Rüzgar Yönü</CardTitle>
                                        <CardSubtitle tag="h5" className="dashboard-card-cardsubtitle ">{this.props.weatherData.Wind_Degree}</CardSubtitle>  
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </Container>
                <TempChart systemData={this.stateSystemData}/>
                <SpeedChart systemData={this.stateSystemData}/>
            </div>
        )
    }
}

//we access the redux states(reducers) with mapStateToProps
const mapStateToProps = (state) => {
    return { 
        weatherData:state.weatherDataReducer,
        isLoggedIn:state.loggerReducer,
        systemData:state.systemDataReducer
        }
  }
  
//we access the redux functions(actions) with mapDispatchToProps  
const mapDispatchToProps={
     getWeatherDataFromAPI: getWeatherDataFromAPI,
     verifyTokenFromAPI:verifyTokenFromAPI,
     getSystemDataFromAPI:getSystemDataFromAPI
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
