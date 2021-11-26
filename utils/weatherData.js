const request = require ('request');
const constants = require('../utils/config');

const weatherData =(address, callback) => {
    const url = constants.openWeatherMap.Base_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.key;
    request({url, json:true}, (error, {body})=>{
        console.log(body);
        if(error){
            callback("can't fetch data from open weather map api", undefined)
        }else{
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}
module.exports = weatherData;