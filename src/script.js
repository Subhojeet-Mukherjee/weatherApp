const apiKey="079d1cc431aebd0ccfdc05fbed16ee1f";
const searchBox= document.querySelector("input");
const searchBtn= document.querySelector("button");
const weatherIcon=document.querySelector(".weather-icon")



async function checkWeather(city) {
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
        try {
        const response= await fetch(apiURL);
        const data= await response.json();
        if (data.cod === "404" || data.cod=== "400") {
            alert("City not found. Please enter a valid city name.");
            
            return;

        }
        else {
            document.querySelector(".City").textContent= data.name;
            document.querySelector(".temp").textContent= Math.round(data.main.temp) +"°C";
            document.querySelector(".humidity").textContent= data.main.humidity+"%";
            document.querySelector(".wind").textContent= data.wind.speed+" km/h";
            document.querySelector(".time").textContent=`Last Updated at ${new Date(data.dt).toLocalString('en-IN',{hour12: false})}`
            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src="images/clouds.png"
                    
                    break;
                case "Mist":
                    weatherIcon.src="images/mist.png"
                 break;
                case "Clear":
                    weatherIcon.src="images/clear.png"
                    break;
                case "Rain":
                    weatherIcon.src="images/rain.png"
                    break;
                case "Drizzle":
                    weatherIcon.src="images/drizzle.png"
                    break;
            }
    
        }
    } catch (error) {
        alert("Error in fetching details",error)
    }
   
}

checkWeather("assam");

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
},false)

searchBox.addEventListener("keydown",(event)=>{
    if(event.key =="Enter"){   
    checkWeather(searchBox.value);
}
},false)
