const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const bodyParserJson = bodyParser.json();
const app = express();
app.use(bodyParserJson);
app.use(express.static("frontend"));

let contacts = [];
let settings = {
    contactsLastId:1
};

// getting list of Contacts
app.get("/contacts",function(req,res){
    res.send(contacts);
});

//  get contact by id
app.get("/contacts/:id",function(req,res){
    let contact = contacts.find(newcontact => newcontact.id==req.params.id);
    res.send(contact);
    });

// add new contact
app.post("/contacts",function(req,res){
    req.body.id = settings.contactsLastId++;
    contacts.push(req.body);
    saveToDB();
    res.send(contacts);
    
});

// update contact
app.put("/contacts",function(req,res){
    let contact = contacts.find(newcontact => newcontact.id==req.body.id);
    contact.Name = req.body.Name;
    contact.Phone = req.body.Phone;
    saveToDB();
    res.send(req.body);
});

// delete contact
app.delete("/contacts/:id",function(req,res){
    let contact = contacts.indexOf(newcontact => newcontact.id==req.params)
    contacts.splice(contact,1);
    saveToDB();
    res.send({success:true,success});
});

//save data to file db
function saveToDB(){
    fs.writeFile("contacts.db",JSON.stringify(contacts),function(err){
        if(err)
        console.log(err);
    })
    fs.writeFile("settings.db",JSON.stringify(settings),function(err){
        if(err)
        console.log(err);
    })
}

function loadFromDB(){
    fs.readFile("contacs.db",function(err,data){
        if(err)
            console.log(err);
        else
            contacts=JSON.parse(data);
    })

    fs.readFile("settings.db",function(err,data){
        if(err)
            console.log(err);
        else
            settings=JSON.parse(data);
    })
}

loadFromDB();


app.listen(3000, (req, res) => {
	console.log("Connection established on port 3000")
})