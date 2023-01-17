const express = require("express");
const bodyParser = require("body-parser");

const bodyParserForm = bodyParser.urlencoded({ extended: true });
const app = express();

app.get("/home",function(req,res){
    res.sendFile(__dirname+"/views/home.html")
})

app.get("/form",function(req,res){
    res.sendFile(__dirname+"/views/form.html")
    
})

app.post("/login",bodyParserForm,function(req,res){
    console.log(req.body)
    if(req.body.pass.length < 8 ){
        res.send("ERROR: pass is less than 8 chars")
    }
    else{
        res.send("login success")
    }
    
})
app.listen(8088)
