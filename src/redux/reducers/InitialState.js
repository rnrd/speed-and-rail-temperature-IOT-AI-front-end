//The initial state of redux.
//isLooged key of initial state is for checking login/logout state.
//we get weather data as single json object.
//and we get system data from API as json array that includes 5 json object.
//this array will include last 5 log of database.
//For now we should initialize all of these states before getting data from API.
//if we do not initialize and leave states as null we may have errors
export const initialState={
    weatherData:{
                Sky:"veri yok",
                Humidity:0,
                Temp:0,
                Temp_Feel:0,
                Wind_Speed:0,
                Wind_Degree:0
            },
    isLogged:false,
    systemData:[
                {
                    start:false,
                    direction:true,
                    temperature:0,
                    temperatureValidation:0,
                    speed:0,
                    counter_1:0,
                    counter_2:0,
                    roundedDeviation:0,
                    hour:0,
                    minute:0
                },
                {
                    start:false,
                    direction:true,
                    temperature:0,
                    temperatureValidation:0,
                    speed:0,
                    counter_1:0,
                    counter_2:0,
                    roundedDeviation:0,
                    hour:0,
                    minute:0
                },
                {
                    start:false,
                    direction:true,
                    temperature:0,
                    temperatureValidation:0,
                    speed:0,
                    counter_1:0,
                    counter_2:0,
                    roundedDeviation:0,
                    hour:0,
                    minute:0
                },
                {
                    start:false,
                    direction:true,
                    temperature:0,
                    temperatureValidation:0,
                    speed:0,
                    counter_1:0,
                    counter_2:0,
                    roundedDeviation:0,
                    hour:0,
                    minute:0
                },
                {
                    start:false,
                    direction:true,
                    temperature:0,
                    temperatureValidation:0,
                    speed:0,
                    counter_1:0,
                    counter_2:0,
                    roundedDeviation:0,
                    hour:0,
                    minute:0
                }
    ]
}


    