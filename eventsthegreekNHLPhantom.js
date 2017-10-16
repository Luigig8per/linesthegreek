let cheerio = require('cheerio')
var http= require("http")
var fs = require('fs');
var express = require('express');
var jquerygo = require('jquerygo');
var sql = require("seriate");
let jsonframe = require('jsonframe-cheerio');
var Horseman = require('node-horseman');
var horseman = new Horseman();



const phantom = require('phantom');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url)
    });

    const status = await page.open('https://stackoverflow.com/');
    console.log(status);

    const content = await page.property('content');
    console.log(content);

    await instance.exit();
}());

var config = {
    "host": "10.10.10.46",
     "user": "sportbookdba",
     "password": "lumalu",
     "database": "DonBest"
 };

sql.setDefaultConfig( config );


var insertEventNHL = function(qPlayers, propositions_name, thegreek_event_id, title, hour,  home_team, home_spread,  home_money_ln, home_total, away_team, away_spread, away_money_ln , away_total, game_title, option_3, option_3_money_ln, option_4, option_4_money_ln) {
    
    
    
        return sql.execute( {
            procedure: "[dbo].[thegreek_insert_event_nhl]",
            params: {

                qPlayers: {
                    type: sql.int,
                    val: qPlayers
                },

                propositions_name: {
                    type: sql.VARCHAR(200),
                    val: propositions_name
                },
                thegreek_event_id: {
                    type: sql.INT,
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
                        type: sql.VARCHAR(200),
                            val: option_3
                          },

                          option_3_money_ln: {
                            type: sql.int,
                                val: option_3_money_ln
                              },

                              option_4: {
                                type: sql.VARCHAR(200),
                                    val: option_4
                                  },
        
                                  option_4_money_ln: {
                                    type: sql.int,
                                        val: option_4_money_ln
                                      },

                  
    
    
    
            }
        } );
       
    };

    var insertEvent = function( propositions_name, thegreek_event_id, title, hour,  home_team, home_spread,  home_money_ln, home_total, away_team, away_spread, away_money_ln , away_total, game_title) {
        
        
        
            return sql.execute( {
                procedure: "[dbo].[thegreek_insert_event]",
                params: {

                  

                    propositions_name: {
                        type: sql.VARCHAR(200),
                        val: propositions_name
                    },
                    thegreek_event_id: {
                        type: sql.INT,
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
    "All":"*",
            "Sub":"h1",
           
    
         //   "Date":".icon",

          //  "id":".lines  @ id",
     
            "Games":{
                "_s":".simpleContainer .simpleContainer",
                "_d":[{
        
               
                    "Title": "H2",
                   
                    "idGame":".lines  @ id",
                    "id2":".lines [id]",
        
                    "Events":{
                        "_s":".table-container",
                        "_d":[{
                
                            "id":".lines  @ id[2]",
                            "id2":".lines [id]",
                                       
            
                                "Lines":{
                                    "_s":".lines",
                                    "_d":[{
                            
                                        "id":"div  @ id",
                                        "id":".table  @ id",
                                        "id3":"  [id]",
                                        "id4":"  #id",
                                        "id5":"  [attr=id]",
                                        // "id6": "@ id",
                                        // "id7": "@ id",
                                                   
                                        "Title": ".title",
                                        "Note":".props-table.props-bar",
                                    
                                            "Players":{
                                                "_s":".table",
                                                "_d":[{
                                                    "id":".table  @ id",
                                                    "id5":"  [attr=id]",
                                                    "id":".lines  @ id",
                                                  
                                                    "id3":"  [id]",
                                                    "id4":"  #id",
                                                 
                                     
                                                
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
//console.log(json);

 
  var values= [];
  
        
     
    var numPlayers=0;

    // }
   //  console.log('Events in game cicle:')
    for( var Game in json2.PROPOSITIONS.Games) {   
        
       
      
        for( var Events in json2.PROPOSITIONS.Games[Game].Events) {    
           

            for( var Lines in json2.PROPOSITIONS.Games[Game].Events[Events].Lines) {   
                
                eventId= json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].id;
              
                
                for( var Players in json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players) {    
                    
                 
                                 
                                   numPlayers=numPlayers+1;
                               
                             }

                             if (numPlayers==1)
                             {
                               
                              
                             }
                             
                             else
                             if (numPlayers==2)
                             {
                                insertEventNHL(3,json2.PROPOSITIONS.Sub, eventId.slice(0,9), json2.PROPOSITIONS.Games[Game].Title, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, '',  json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds );
                             }
                             else
                             if (numPlayers==3)
                            {
                                insertEventNHL(3,json2.PROPOSITIONS.Sub, eventId.slice(0,9), json2.PROPOSITIONS.Games[Game].Title, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, '',  json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds );
                                console.log('Players:' + numPlayers);
                                // console.log('Event:' + Events);
                                // console.log('Player 1: ' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player);
                                // console.log('Player 2: ' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player);
                                // console.log('Player 3: ' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player);
                                // console.log('Title:' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title);
                                // console.log('Title2:' + json2.PROPOSITIONS.Games[Game].Title);
                            
                             //  insertEventNHL('', json2.PROPOSITIONS.Games[Game].Title,'',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, '',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].playerodds );
                            }
                            if (numPlayers==4)
                            {
                              //  insertEventNHL(4, json2.PROPOSITIONS.Sub, '',json2.PROPOSITIONS.Games[Game].Title,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, '',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title , json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].playerodds );
                                        
                                
                                  insertEventNHL(4,json2.PROPOSITIONS.Sub, eventId.slice(0,9), json2.PROPOSITIONS.Games[Game].Title, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, '',  json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].playerodds );
                                console.log('Players:' + numPlayers);
                                // console.log('Event:' + Events);
                                // console.log('Player 1: ' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player);
                                // console.log('Player 2: ' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player);
                                // console.log('Player 3: ' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player);
                                // console.log('Title:' + json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title);
                                // console.log('Title2:' + json2.PROPOSITIONS.Games[Game].Title);
                            
                             //  insertEventNHL('', json2.PROPOSITIONS.Games[Game].Title,'',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds, '',json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].playerodds );
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








 