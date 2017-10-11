let cheerio = require('cheerio')
var http= require("http")
var fs = require('fs');
var express = require('express');
var jquerygo = require('jquerygo');
var sql = require("seriate");
let jsonframe = require('jsonframe-cheerio');


var config = {
    "host": "10.10.10.46",
     "user": "sportbookdba",
     "password": "lumalu",
     "database": "DonBest"
 };

sql.setDefaultConfig( config );

var insertEvent = function(propositions_name, thegreek_event_id, title, hour,  home_team, home_spread,  home_money_ln, home_total, away_team, away_spread, away_money_ln , away_total, game_title) {
    
    
    
        return sql.execute( {
            procedure: "[dbo].[thegreek_insert_event]",
            params: {
                propositions_name: {
                    type: sql.VARCHAR(200),
                    val: propositions_name
                },
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
                    type: sql.VARCHAR(200),
                    val: home_spread
                },
                hour: {
                    type: sql.VARCHAR(200),
                    val: hour
                },
                 home_money_ln: {
                    type: sql.VARCHAR(200),
                    val: home_money_ln
                },
                 home_total: {
                    type: sql.VARCHAR(200),
                    val: home_total
                },
                  away_team: {
                    type: sql.VARCHAR(200),
                    val: away_team
                },
                 away_spread: {
                    type: sql.VARCHAR(200),
                    val: away_spread
                },
                away_money_ln: {
                    type: sql.VARCHAR(200),
                    val: away_money_ln
                    
                },
    
                 away_total: {
                    type: sql.VARCHAR(200),
                    val: away_total
                  },
    
                game_title: {
                  type: sql.VARCHAR(200),
                      val: game_title
                    },

                  
    
    
    
            }
        } );
       
    };

//


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
    
            "Sub":"h1",
    
         //   "Date":".icon",

          //  "id":".lines  @ id",
     
            "Games":{
                "_s":".simpleContainer",
                "_d":[{
        
               
                    "Title": "H2",
                   
                    "id":".lines  @ id",
                   
        
                    "Events":{
                        "_s":".table-container",
                        "_d":[{
                
                            "id":".lines  @ id",
                          
                                       
            
                                "Lines":{
                                    "_s":".lines",
                                    "_d":[{
                            
                                        "id":".lines  @ id",
                                      
                                        // "id6": "@ id",
                                        // "id7": "@ id",
                                                   
                                        "Title": ".title",
                                      
                                    
                                          "player1":".has-lines .name",
                                          "player1odds":".has-lines .odd ",
                                     
                            
                                           "player2":".row-away .name",
                                            "player2_odd":".row-away .odd",
                                                       
                            
                                    }]
                                }


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

 
  var values= [];
  
        
     
    
    // }
     console.log('Events in game cicle:')
    for( var Game in json2.PROPOSITIONS.Games) {   
        
        if (Game>0)
        {
      
        for( var Events in json2.PROPOSITIONS.Games[Game].Events) {    
           
            for( var Events in json2.PROPOSITIONS.Games[Game].Events) {    
                
      console.log('iNSERT:');
                 insertEvent(json2.PROPOSITIONS.Sub, '', json2.PROPOSITIONS.Games[Game].Title,'',json2.PROPOSITIONS.Games[Game].Events[Events].player1, json2.PROPOSITIONS.Games[Game].Events[Events].player1odds, json2.PROPOSITIONS.Games[Game].Events[Events].player1odds, '',json2.PROPOSITIONS.Games[Game].Events[Events].player2, '', json2.PROPOSITIONS.Games[Game].Events[Events].player2_odd,'', json2.PROPOSITIONS.Games[Game].Events[Events].Title );
              }
 console.log('iNSERT:');
            insertEvent(json2.PROPOSITIONS.Sub, '', json2.PROPOSITIONS.Games[Game].Title,'',json2.PROPOSITIONS.Games[Game].Events[Events].player1, json2.PROPOSITIONS.Games[Game].Events[Events].player1odds, json2.PROPOSITIONS.Games[Game].Events[Events].player1odds, '',json2.PROPOSITIONS.Games[Game].Events[Events].player2, '', json2.PROPOSITIONS.Games[Game].Events[Events].player2_odd,'', json2.PROPOSITIONS.Games[Game].Events[Events].Title );
         }
        }
   }

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








 