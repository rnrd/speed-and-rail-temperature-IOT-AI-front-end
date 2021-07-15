import React from 'react';
import {useEffect} from "react";
import { Line } from 'react-chartjs-2';
import {Container} from 'reactstrap';
import "../css/TemperatureChart.css"



const SpeedChart=(props)=> {

  //SpeedChart is a child component of dashboard.
  //SpeedChart does not use redux states.
  //States will come from dashboard in props.

    //in order to draw graph(chart) we will define null arrays.
    //then add values in these with functions
    var graphData=[];
    var hoursData=[];

    //chartAxisY function adds values in graphData array.
    const chartAxisY=()=>{
        for(let i=0;i<5;i++){
            graphData.push(props.systemData[i].speed);
        }

        return graphData
    }

    //chartAxisX function adds values in hoursData array.
    const chartAxisX=()=>{
    
      for(let i=0;i<5;i++){
        
        if(props.systemData[i].hour < 10 && props.systemData[i].minute < 10){
        hoursData.push("0"+props.systemData[i].hour.toString()
        +".0"
        +props.systemData[i].minute.toString()
        );
        }

        else if(props.systemData[i].hour < 10 ){
        hoursData.push("0"+props.systemData[i].hour.toString()
        +"."
        +props.systemData[i].minute.toString()
        );
        }

        else if(props.systemData[i].minute < 10 ){
        hoursData.push(props.systemData[i].hour.toString()
        +".0"
        +props.systemData[i].minute.toString()
        );
        }

        else{
          hoursData.push(props.systemData[i].hour.toString()
          +"."
          +props.systemData[i].minute.toString()
          );
        }
      }
      return hoursData
    }


    //now we will define all options of chart(graph) inside
    var chartState={
        labels: chartAxisX(),
        datasets: [
          {
            label: 'Tren Hızı',
            fill: false,
            lineTension: 0.5,
            borderColor: "black",
            borderDash: [1, 1],
            backgroundColor: "red",
            borderCapStyle:"butt",
            borderJoinStyle:"bevel",
            borderWidth: 2,
            pointStyle: "circle",
            pointBackgroundColor: "red",
            pointBorderColor: "red",
            pointHoverBackgroundColor: "red",
            pointHoverBorderColor: "red",
            data: chartAxisY()
          }
        ]
      };

    //now we will define options of chart(graph) outside
    var chartOptions={
        title:{
          display:true,
          text:'Tren Hızı',
          fontSize:20
        },
        legend:{
          display:true,
          position:'top'
        }
      }


    //useEffect corresponds to componenDidMount, componentDidUpdate and componentWillUnmount lifecycle methods that are in class components.
    //if we give an empty array just after anonymous function inside useEffect, it works as componenDidMount
    //if we assign no array like below, useEffect works as componenDidMount and componentDidUpdate. It updates the page for each state changes.
    //if we assign an array and give a variable or function this array:
    //update will happen when each state change except that variable or function.
    //if we return the anonymous function of useEffect to another function:
    // useEffect works as componentWillUnmount additional to componenDidMount and componentDidUpdate.
    //in useEffect we will run chartAxisX and chartAxisY
    useEffect(() => {
        chartAxisX();
        chartAxisY()
    })
    
    return (
        <div>
            <Container className="SpeedChart-container">
                <Line
                data={chartState}
                options={chartOptions}
                />
              </Container>
        </div>
    )
}


export default  SpeedChart