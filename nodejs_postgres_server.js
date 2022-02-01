const { strictEqual } = require('assert');
const statik = require('node-static');

var http = require('http');
var db = require('./db');

var temp = "0.0"

const async_db_interaction = async (body, res) => {
	var response = "SUCCESS";
	try {
		const data = JSON.parse(body);
		if(data.id === "Powered_Screen1")
		{
			temp = data.sensor_data.temperature;//important to do this first!
			data.number = 33;
		}
		else if(data.id === "garage")
		{
			data.number = 34;
		}
		else if(data.id === "test")
		{
			data.number = 1;
		}
		else 
		{
			throw "wrong data number!";
		}

		var result = await db.db_store(data);
		res.writeHead(200, { "Content-Type": "text/plan" });
		res.end("SUCCESS");
	} catch (error) { 
		console.error(error);
		console.error(body);
		///XXX - differentiate on bad json vs database down
		res.writeHead(400, { "Content-Type": "text/plan" });
		res.end("FAILED");
	};
}

var server = http.createServer(function (req, res) {
	if(req.url === '/lasttemp')
	{//req.method === "GET"
		res.writeHead(200, {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		});
		res.write(JSON.stringify({ temperature: temp }));
		res.end();
	}else if(req.url === '/logs')
	{//req.method === "POST" 
		var body = "";
		req.on("data", function (chunk) {
			body += chunk;
		});
		req.on("end", function () {
			console.log(body);
			res.writeHead(200, { "Content-Type": "text/plan" });
			res.end("SUCCESS");
		});
	}else if(req.url === '/sensor_data')
	{//req.method === "POST" 
		var body = "";
		req.on("data", function (chunk) {
			body += chunk;
		});
		req.on("end", function () {
			async_db_interaction(body, res);
		});
	}else if (req.url === '/version')
	{
		res.writeHead(200, { "Content-Type": "text/plan" });
		/// READ FROM FILE versions.txt or something
		res.end();

	}else if (req.method === "POST") {  // XXX = needs to be removed after upgrading all the devices
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
