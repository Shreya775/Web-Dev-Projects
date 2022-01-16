const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
    
    // console.log("post received");
    const query = req.body.cityname;
    const apiKey = "174779f6053c3a1c857359264e464a81";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+ unit;    
    https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        // console.log(description);
        // console.log(temp);
        const icon = weatherData.weather[0].icon;
        const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The temperature in "+query+ " is "+ temp +" degree Celcius.</h1> ");
        res.write("<p>The weather is currently "+ description +"</p>");
        res.write("<img src="+imageUrl+">");

        res.send();
    });
});
});

// // res.send("server is up and running!"); 



app.listen(3000, function(){
    console.log("Server running on port 3000");
});