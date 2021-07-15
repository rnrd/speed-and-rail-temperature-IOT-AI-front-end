import React from 'react'
import Home from "./Home";
import Project from "./Project";

const Homepage=(props)=> {

    //Homepage will not have any states and will include Home and Project components.
    //We have passed variable as props to this component and this props includes history information.
    //We will also pass this props to Home component. Because we need to page routing without page refresh
    
    
    return (
        <div>
            <Home propsWithHistory={props}/>
            <Project/>
        </div>
        
    )
}

  export default Homepage;