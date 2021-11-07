const config = { user: 'node_js', host: 'database', database: 'sensors', port: 5432, ssl: { rejectUnauthorized: false, }, }
const { Pool, Client } = require('pg')
const pool = new Pool(config)

/*
pool.query('SELECT * FROM rpi_sensor limit 1;', (err, res) => {
    if (err) { throw err }
    console.log(' ', res.rows[0])
})
*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
module.exports = {
    db_store: (text) => {
        return new Promise(async (success, failed) => {
            await sleep(1000*60);
            /*0);
            pool.query(text, (err, res) => {
                if (err) { 
                    failed(err);
                }
                success(res.rows[0]);
            })
            */
            success("10.0");
        });
    },
}