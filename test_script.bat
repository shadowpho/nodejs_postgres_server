curl -X POST http://localhost:4050 -H "Content-Type: application/json" -d "{ \"id\" : \"1\", \"sensor_data\" : { \"temperature\" : \"99.9\", \"pressure\" : \"99.9\" ,\"humidity\" : \"99.9\" },\"battery\" : { \"battery_voltage\" : \"99.9\"}}"
curl -H "Accept: application/json" http://localhost:4050