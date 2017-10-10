let cheerio = require('cheerio')
var http= require("http")
var fs = require('fs');
var express = require('express');
var jquerygo = require('jquerygo');
var sql = require("seriate");
let jsonframe = require('jsonframe-cheerio');

// Change the config settings to match your
// SQL Server and database
var config = {
   "host": "localhost",
    "user": "sa",
    "password": "laptop",
    "database": "DonBest"
};

sql.setDefaultConfig( config );


var updateMember = function( thegreek_event_id, title, hour,  home_team, home_spread,  home_money_ln, home_total, away_team, away_spread, away_money_ln , away_total) {



    return sql.execute( {
        procedure: "[dbo].[thegreek_insert_event]",
        params: {
            thegreek_event_id: {
                type: sql.VARCHAR(200),
                val: thegreek_event_id
            },
            home_team: {
                type: sql.VARCHAR(200),
                val: home_team
            },
            title: {
                type: sql.VARCHAR(200),
                val: title
            },
            home_spread: {
                type: sql.NVARCHAR,
                val: home_spread
            },
            hour: {
                type: sql.VARCHAR,
                val: hour
            },
             home_money_ln: {
                type: sql.VARCHAR,
                val: home_money_ln
            },
             home_total: {
                type: sql.VARCHAR,
                val: home_total
            },
              away_team: {
                type: sql.VARCHAR,
                val: away_team
            },
             away_spread: {
                type: sql.VARCHAR,
                val: away_spread
            },
            away_money_ln: {
                type: sql.VARCHAR,
                val: away_spread
                
            },

             away_total: {
                type: sql.VARCHAR,
                val: away_total
},



        }
    } );
};



//

fs.readFile('bodyprops.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var dataHtml= (data);
    
     let $= cheerio.load(dataHtml);

     let jsonframe = require('jsonframe-cheerio')
     jsonframe($); // initializes the plugin


let frame1={
    

"PROPOSITIONS":
{

  //  "Sport": ".simpleContainer",
    
            "Sub":".simpleContainer @ id",
    
            "Date" : "h2",

          //  "id":".lines  @ id",
     
            "Games":{
                "_s":".simpleContainer",
                "_d":[{
        
               
                    "Title": ".title",
                   
                   
        
                    "Events":{
                        "_s":".lines",
                        "_d":[{
                
                       
                                       
                            "Title": ".title",
                          
                        
                              "player1":".has-lines .name",
                              "player1odds":".has-lines .odd ",
                         
                
                               "player2":".row-away .name",
                                "player2_odd":".row-away .odd",
                                           
                
                        }]
                    }
                
        
                }]
            },
   

   

}
}




    
    
    var json=$('body').scrape(frame1, { string: true } );
    // console.log("SPORTBOOK: "  + json);
var json2= JSON.parse(json);
console.log(json);

 //   var Leagues= json2.LEAGUES.Sport.Title;
  //WORKS: console.log(json2.LEAGUES.Games[1].Teams[1].Team);
//   console.log('EVENTS:')
//   console.log(json2.PROPOSITIONS.Events);
  
//   console.log('GAMES :')
//   console.log(json2.PROPOSITIONS.Games);
  var values= [];
    // for( var Events in json2.PROPOSITIONS.Events) {    
    //     console.log('Event ' + Events)
    //     console.log(json2.PROPOSITIONS.Events[Events]);
        
     
    
    // }
    // console.log('Events in game cicle:')
    // for( var Game in json2.PROPOSITIONS.Games) {    
    //     console.log('Game ' + Game)
    //     console.log(json2.PROPOSITIONS.Games[Game].Title);
        
    //     for( var Events in json2.PROPOSITIONS.Games[Game].Events) {    
    //         console.log('Event ' + Events + ' Game ' + Game)
    //         console.log(json2.PROPOSITIONS.Games[Game].Events[Events]);
    //     }
    // }

    // console.log('Events only cicle:')
    // for( var Events in json2.PROPOSITIONS.Games.Events) {    
    //     console.log('Event ' + Events)
    //     console.log(json2.PROPOSITIONS.Games.Events[Events]);
    // }

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








 