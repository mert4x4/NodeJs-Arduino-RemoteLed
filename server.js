const http = require('http');
const fs = require('fs')
var contents = fs.readFileSync("config.json");
var jsonContent = JSON.parse(contents);
var SerialPort = require('serialport');
var arduino = new SerialPort(jsonContent.ComPort, { autoOpen: true });
var port = jsonContent.port;

function define(url,ArduinoText,SendToArduino,req,res,Ip)
{
	if(req.url == '/' + url)
	{
		fs.createReadStream('\index.html').pipe(res);
		if(SendToArduino == 1)
			arduino.write(ArduinoText + "\n");
		console.log(Ip + ": " + url);
	}
}

const server = http.createServer((req, res) => {
	var ConnectedIp = req.connection.remoteAddress;
	define("",null,true,req,res,ConnectedIp);
	define("OFF",'N',true,req,res,ConnectedIp);
	define("DISCO",'D',true,req,res,ConnectedIp);
	define("ORANGE",'O',true,req,res,ConnectedIp);
	define("YELLOW",'Y',true,req,res,ConnectedIp);
	define("RED",'R',true,req,res,ConnectedIp);
});
server.listen(port, (err) => {  
  console.log('Mert4x4 Led Server');
  console.log('Server is running...');
})