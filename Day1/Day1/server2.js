const express = require("express");
const bodyParser = require("body-parser");

const bodyParserForm = bodyParser.urlencoded();
const bodyParserJSON = bodyParser.json();
/*
function createApplication(){
    let app = {}
    app.listen=function(){

    }

    return app;
}


const express = createApplication;
const app = express();

*/

const app = express();

app.get("/home",function(req,res){
    res.sendFile(__dirname+"/views/home.html");
})


app.get("/about",function(req,res){
    res.sendFile(__dirname+"/views/about.html");
})


app.get("/countries",function(req,res){
    res.sendFile(__dirname+"/views/countries.html");
})


app.post("/login",bodyParserForm,function(req,res){

    if(req.body.email=="Ahmed" && req.body.password=="123"){
        res.send("login success");
    }else{
        res.send("login failed");
    }
    console.log(req.body);
})

app.get("/login",function(req,res){

    if(req.query.email=="Ahmed" && req.query.password=="123"){
        res.send("login success");
    }else{
        res.send("login failed");
    }
    console.log(req.query);
})



app.listen(8080);
//console.log(express);