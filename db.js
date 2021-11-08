const config_prod = { user: 'node_js', host: 'database', database: 'sensors', port: 5432, ssl: { rejectUnauthorized: false, }, }
const config_test = { user: 'test', host: 'database', database: 'test', port: 5432, ssl: { rejectUnauthorized: false, }, }

const { Pool, Client } = require('pg')

console.log("Starting db.js")

if(process.env.NODE_ENV=='production')
{
    console.log("Connecting to PRODUCTION db");
    right_config = config_prod;
}
else 
{
    console.log("Connecting to TESTING db");
    right_config = config_test;
}

const pool = new Pool(right_config);
/*
pool.query('SELECT * FROM rpi_sensor limit 1;', (err, res) => {
    if (err) { throw err }
    console.log(' ', res.rows[0])
})
*/

pool.on('error', function(error, client) {
    console.log("Idle pool ERROR" + error + client)
  })
 
module.exports = {
    db_store: (text) => {
        var sql_call = "INSERT INTO esp32(time, sensor_id, temperature, pressure, humidity, battery) VALUES($1,$2,$3,$4,$5,$6);";

        const values = [new Date().toISOString() , text.id, text.sensor_data.temperature, text.sensor_data.pressure, text.sensor_data.humidity, text.battery.battery_voltage];
	
        return new Promise((success, failed) => {

            pool.query(sql_call,values, (err, res) => {
                if (err) { 
                    console.log(err);
                    failed(err);
                }
                else success(res.rows[0]);
            })
            
        });
    },
}