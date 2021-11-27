const { 
    createPool
} = require('mysql');
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "weather_report",
    connectionLimit: 10

})
pool.query(`select * from climate_information`,(error, result, fields)=>{
    if(error){
        return console.log(error);
    }
    return console.log(result);
})
module.exports = pool;