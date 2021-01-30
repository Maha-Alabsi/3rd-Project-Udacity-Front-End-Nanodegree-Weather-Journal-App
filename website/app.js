// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=b381c1b0afd0171d654408a9e76bb707&units=metric';
const serverURL = 'http://localhost:8000/';
const button = document.getElementById('generate');


////////////////////////////////////////////////////////

// Event listener to add function to existing HTML DOM element

button.addEventListener('click', performAction);

/* Function called by event listener */
/*
~ When the button clickd:
1.Call Get Web API Data function 
2.Post all recieved data into the server 
3.Update the UI
*/
function performAction(e) {
  const newZipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  let newDate = new Date();
  let appDate = newDate.getDay() + '.' + newDate.getMonth() + '.' + newDate.getFullYear();
  //call Get function (getWeather)
  getWeather(baseURL, newZipCode, apiKey)
    .then(function (data) {
      console.log(data)
      postData('/addWeather', {date: appDate ,temp: data.main.temp, feel: feelings })
    })
    .then(function () {
      updateUI() 
    })
    .catch(function(zipCode){
      //return an error if the zip code not found in the API
        if (zipCode.cod != 200){
        return alert("This City is not found")
      }
    })
}


/* 1. Function to GET Web API Data */

const getWeather = async (baseURL, zipCode, apiKey)=>{
  //we build a dynamic URL into a fetch API
  const res = await fetch(baseURL + zipCode + apiKey);
    try {
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("error", error);
    }

}

/* 2. Function to POST data */

const postData = async ( url = `${serverURL}addWeather`, data = {})=>{
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
    },
  body: JSON.stringify(data)// body data type must match "Content-Type" header        
});
  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};


/* 3. Function to Update the UI */

const updateUI = async () => {
  //Get all the data saved on server 
  const request = await fetch(`${serverURL}all`);
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temp: ${allData.temp}C`;
    document.getElementById('content').innerHTML = `My Feelings: ${allData.feel}`;
  } catch (error) {
    console.log("error", error);
  }
}
