const config = { user: 'node_js', host: 'database', database: 'sensors', port:5432,  ssl: {rejectUnauthorized: false,},}
const { Pool, Client } = require('pg')
const pool = new Pool(config)


pool.query('SELECT * FROM rpi_sensor limit 1;', (err, res) => {
    if (err) { throw err }
    console.log(' ', res.rows[0]) })





module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
    }