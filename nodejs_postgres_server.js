var http = require('http');
var db = require('./db');

var temp = "0.0"

const async_db_interaction = async (body, res) => {
	var response = "SUCCESS";
	try {
		const data = JSON.parse(body);
		temp = data.sensor_data.temperature;
		console.log(temp);
	} catch (error) { 
		console.error(error)
		response = "FAILED TO PARSE JSON";
	};

	var result = await db.db_store(body);
	console.log(result);

	res.writeHead(200, { "Content-Type": "text/plan" });
	res.end(response);
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

server.listen(4050);
console.log('Node.js web server at port 4050 is running..')
