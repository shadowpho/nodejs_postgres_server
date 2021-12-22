const { strictEqual } = require('assert');
var http = require('http');
var db = require('./db');

var temp = "0.0"

const async_db_interaction = async (body, res) => {
	var response = "SUCCESS";
	try {
		const data = JSON.parse(body);
		temp = data.sensor_data.temperature;//important to do this first!
		if(data.id == "")
			data.number = 33;
		if(data.id == "garage")
			data.number = 34;
		var result = await db.db_store(data);

		console.log(result);
		res.writeHead(200, { "Content-Type": "text/plan" });
		res.end("SUCCESS");
	} catch (error) { 
		console.error(error);
		console.error(body);
		///XXX - differentiate on bad json vs database down
		res.writeHead(400, { "Content-Type": "text/plan" });
		res.end("FAILED");
	};

	
};

var server = http.createServer(function (req, res) {
	if (req.method == "GET") {
		res.writeHead(200, {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		});
		res.write(JSON.stringify({ temperature: temp }));
		res.end();

	} else if (req.method == "POST") {
		var body = "";
		req.on("data", function (chunk) {
			body += chunk;
		});
		req.on("end", function () {
			async_db_interaction(body, res);
		});
	}
});

server.listen(4049);
console.log('Node.js web server at port 4049 is running..')
