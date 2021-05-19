import { convertDate } from "./utils";

import cloudy from "../img/cloudy.png";
import snow from "../img/snow.png";
import rain from "../img/rain.png";
import sunny from "../img/sunny.png";

// document.getElementById('myForm').onsubmit= function getZip() {
//     let zipcode = document.getElementById('zipcode').value 
// }

{/* <form id="myForm" action="" method="post" id="delInfo">
    	Zip Code:<br>
    	<input type="text" name="zipcode" id="zipcode"><br>
    	<input type="submit" onClick="getZip()"/>
      </form> */}

let currentDay = new Date();
let date =
  (currentDay.getMonth() +
  1) +
  "/" +
  currentDay.getDate() +
  "/" +
  currentDay.getFullYear();
console.log(date);

async function getForecast() {
  let response = await fetch(
    `https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=60647`
  );
  let data = await response.json();
  let title = document.querySelector(".title");
  let h2 = document.createElement("h2");
  h2.appendChild(
    document.createTextNode(
      `Weather Forecast for ${data.city}, ${data.regionCode}`
    )
  );
  title.appendChild(h2);
  let forecast = await fetch(
    `https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&date=${date}`
  );

  let dataF = await forecast.json();
  return dataF.daily.data.map((w) => {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    let h3 = document.createElement("h3");
    let description = document.createElement("p");
    let image = document.createElement("img");
    let maxTemp = document.createElement("p");
    let minTemp = document.createElement("p");
    let div = document.createElement("div");
    
    let time = new Date(w.time * 1000);

    description.className = "icon";
    description.appendChild(document.createTextNode(w.icon));
    maxTemp.appendChild(
      document.createTextNode(Math.round(w.temperatureMax) + "°/")
    );
    minTemp.appendChild(
      document.createTextNode(Math.round(w.temperatureMin) + "°F")
    );
    h3.appendChild(
      document.createTextNode(time.toLocaleString("en-us", { weekday: "long" }))
    );
    div.appendChild(maxTemp);
    div.appendChild(minTemp);
    li.appendChild(h3);
    li.appendChild(description);
    li.appendChild(image);
    li.appendChild(div);
    ul.appendChild(li);

    switch (w.icon) {
      case "cloudy":
        return (image.src = cloudy);
      case "rain":
        return (image.src = rain);
      case "snow":
        return (image.src = snow);
      case "sunny":
        return (image.src = sunny);
      default:
    }
  });
}

getForecast();
