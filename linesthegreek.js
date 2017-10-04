let cheerio = require('cheerio')
var http= require("http")
var fs = require('fs');
var express = require('express');
var jquerygo = require('jquerygo');
var sql = require("mssql");

fs.readFile('body.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var dataHtml= (data);
    
     let $= cheerio.load(dataHtml);

     let jsonframe = require('jsonframe-cheerio')
     jsonframe($); // initializes the plugin


let frame1={
    "Title": "h1", 

"LEAGUES":
{

    "Sport": "h3",
    
            "Sub":"h4",
    
            "Date" : "h2",
    
          
    "Games":{
        "_s":".lines",
        "_d":[{
            "Title": ".name",

            "title":"h3",
            "hour":".notes-bar",
           
            "Teams":{
                "_s":"ul",
                "_d":[{
                    "id": "",
                    "Team": ".name",
        
                    "title":"h3",
                    "hour":".notes-bar",
                    "Spread":".spread",
                    "MoneyLn":".money-line",
                    
                    "Total":".total",
                   
            
                    "Team total":".team-total",
                }]
            }


        }]
    }

}
}

    
    
    
    var json=$('body').scrape(frame1, { string: true } );
    // console.log("SPORTBOOK: "  + json);
var json2= JSON.parse(json);
//console.log(json);

    var Leagues= json2.LEAGUES.Sport.Title;
  //WORKS: console.log(json2.LEAGUES.Games[1].Teams[1].Team);

  console.log(json2.LEAGUES.Games);

    for( var Games in json2.LEAGUES) {    
       
         console.log(json2.LEAGUES[Games]);
        // console.log('Games' + Games);
//console.log( 'Game1: ' + Games[1]);
          //  console.log( 'Count: ' + Teams[field][0].Team);
    
    
    }

    fs.writeFile('thegreek.json', JSON.stringify(json, null, 4), function(err) {
        console.log('Thegreek saved in price.json file');
    });

    http.createServer(function(req,res){
        var jsonFile=fs.readFile("thegreek.json", function(err,html){
                    res.writeHead(200,{"Content-Ype":"text/html"})
                    res.write(JSON.stringify({nombre:"Luis", username:"uriel"}));
                    res.end();
                    console.log("JSON File:" + jsonFile);
                });
    }).listen(8080);
   
});

var dbConfig = {
    user: 'sportbookdba',
    password: 'lumalu',
    server: '10.10.10.46', 
    database: 'DonBest' 
};

var  executeQuery = function(query){             
    sql.connect(dbConfig, function (err) {
        if (err) {   
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                 }
                 else {
                        // create Request object
                        var request = new sql.Request();
                        // query to the database
                        request.query(query, function (err, res) {
                          if (err) {
                                     console.log("Error while querying database :- " + err);
                                   
                                    }
                                    else {
                                     
                                           }
                              });
                      }
     });           
}





 