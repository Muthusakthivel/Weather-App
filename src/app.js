const { request, response } = require('express');
const hbs = require ("hbs");
const path = require ("path");
const express = require('express');
const app = express();

const weatherData = require('../utils/weatherData');
const port = process.env.PORT || 3000

const publicStaticDirpath = path.join(__dirname, '../public')

const viewspath = path.join(__dirname, '../templates/views');

const partialspath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);
app.use(express.static(publicStaticDirpath));

app.get('',(request, response)=>{
    response.render("index" ,{
        title: "Weather App"
    });
})

app.get('/weather',(request, response)=>{
    const address = request.query.address
    if(!address) {
        return response.send({
            error: "You must enter address in seacrch box"
        })
    }
    weatherData(address,(error, {temperature, description, cityName})=>{
        if(error){
            return response.send({
                error
            })
        }
        console.log(temperature,description, cityName);
        response.send({
            temperature,
            description,
            cityName
        })
    })
})
app.get("*", (request, response)=>{
    response.render('404', {
        title: "Page not found"
    })
})

app.listen(port, ()=>{
    console.log("server is running on port:", port)
})
module.exports = app;