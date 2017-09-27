let cheerio = require('cheerio')

var fs = require('fs');
var express = require('express');


fs.readFile('body.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var dataHtml= (data);
    
     let $= cheerio.load(dataHtml);

     let jsonframe = require('jsonframe-cheerio')
     jsonframe($); // initializes the plugin


let frame1={
    "title": "h1", 

"LEAGUES":
{

    "Subtitle": "h3",
    
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
    
    
    console.log("SPORTBOOK: "  + $('body').scrape(frame1, { string: true } ))



   


    
    


});



 