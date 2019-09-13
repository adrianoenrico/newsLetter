//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(process.env.PORT || 5000, function(){
   
});


app.get("/signup", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.get("/success", function(req,res){
    res.sendFile(__dirname + "/success.html");
});
app.get("/failure", function(req,res){
    res.sendFile(__dirname + "/failure.html");
});

app.post("/failure",function (req,res){
    res.redirect("/signup");
  });

app.post("/signup", function(req,res){
    var user = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email
    };    
    var data = {
        members : [
            {
                email_address: user.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: user.firstName,
                    LNAME: user.lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/df86c16580",
        method: "POST",
        headers: {
           "Authorization" :  "adriano1 e3307ceda92d87f4496b70940899bd9e-us4"
        },
        body: jsonData
    };
    
    request(options, function(error,response,body){
        if(error){
            console.log(error);
            res.redirect("/failure");
            
        }
        else{
            if(response.statusCode == 200){
                res.redirect("/success");
            }
            else{
                res.redirect("/failure");
            }
            console.log(response.statusMessage);
            
        }
    });

    
   
    
});

