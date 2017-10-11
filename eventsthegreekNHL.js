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


var insertEventNHL = function( thegreek_event_id, title, hour,  home_team, home_spread,  home_money_ln, home_total, away_team, away_spread, away_money_ln , away_total, game_title, option_3, option_3_money_ln, option_4, option_4_money_ln) {
    
    
    
        return sql.execute( {
            procedure: "[dbo].[thegreek_insert_event_nhl]",
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


                    option_3: {
                        type: sql.VARCHAR(20),
                            val: option_3
                          },

                          option_3_money_ln: {
                            type: sql.int,
                                val: option_3_money_ln
                              },

                              option_4: {
                                type: sql.VARCHAR(20),
                                    val: option_4
                                  },
        
                                  option_4_money_ln: {
                                    type: sql.int,
                                        val: option_4_money_ln
                                      },

                  
    
    
    
            }
        } );
       
    };

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

fs.readFile('bodypropsNHL.html', 'utf8', function (err,data) {
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
                "_s":".simpleContainer .simpleContainer",
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
                                      
                                    
                                            "Players":{
                                                "_s":".table",
                                                "_d":[{
                                        
                                                    "id":".lines  @ id",
                                                  
                                                 
                                                 
                                     
                                                
                                                      "player":".has-lines .name",
                                                      "playerodds":".has-lines .odd ",
                                                                                          
                                        
                                                }]
                                            }

                                                       
                            
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
  
        
     
    var numPlayers=0;

    // }
     console.log('Events in game cicle:')
    for( var Game in json2.PROPOSITIONS.Games) {   
        
       
      
        for( var Events in json2.PROPOSITIONS.Games[Game].Events) {    
           

            for( var Lines in json2.PROPOSITIONS.Games[Game].Events[Events].Lines) {    
                
                for( var Players in json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players) {    
                    
                 
                                 
                                   numPlayers=numPlayers+1;
                               
                             }

                             if (numPlayers==1)
                             {
                               
                              
                             }
                             
                             else
                             if (numPlayers==2)
                             {
                                insertEvent(json2.PROPOSITIONS.Sub, '', json2.PROPOSITIONS.Games[Game].Title,'',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, '',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title );
                             }
                             else
                             if (numPlayers==3)
                            {
                                insertEventNHL('', json2.PROPOSITIONS.Games[Game].Title,'',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, '',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds );
                                console.log('Players:' + numPlayers);
                                console.log('Event:' + Events);
                                console.log('Player 1: ' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player);
                                console.log('Player 2: ' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player);
                                console.log('Player 3: ' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player);
                                console.log('Title:' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title);
                                console.log('Title2:' + json2.PROPOSITIONS.Games[Game].Title);
                            
                             //  insertEventNHL('', json2.PROPOSITIONS.Games[Game].Title,'',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, '',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].playerodds );
                            }

                            numPlayers=0;


                
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








 