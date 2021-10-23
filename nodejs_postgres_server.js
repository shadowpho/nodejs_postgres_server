const { Pool, Client } = require('pg')
var http = require('http'); 
const config = { user: 'node_js', host: 'database', database: 'sensors', port:5432,  ssl: {rejectUnauthorized: false,},}

const pool = new Pool(config)

var temp = "0.0"
var server = http.createServer(function (req, res) {   

	    if (req.method == "GET") {
		    res.writeHead(200, {
			    "Content-Type": "application/json",  
		    	    "Access-Control-Allow-Origin":"*"});
		    res.write(JSON.stringify({temperature: temp}));
		    res.end();
	    } else if (req.method == "POST") {
	    	   var body = "";
		   req.on("data", function(chunk) {
			   body+=chunk;
	    	   });
		   req.on("end", function(){
			   const data = JSON.parse(body);
			   temp = data.sensor_data.temperature;
			   console.log(temp);
			   res.writeHead(200, {"Content-Type": "text/plan"});
			   res.end("SUCCESS");
		   });
	}		
});
	
//server.listen(4050); 
	//
//console.log('Node.js web server at port 4049 is running..')
pool.query('SELECT * FROM rpi_sensor limit 1;', (err, res) => {
	  if (err) { throw err }
	  console.log(' ', res.rows[0]) })
