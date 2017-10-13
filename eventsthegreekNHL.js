let cheerio = require('cheerio')
var http= require("http")
var fs = require('fs');
var express = require('express');
var jquerygo = require('jquerygo');
var sql = require("seriate");
let jsonframe = require('jsonframe-cheerio');
var schedule = require('node-schedule');
var cronJob = require('cron').CronJob;
var cron = require('node-cron');



var config = {
    "host": "10.10.10.46",
     "user": "sportbookdba",
     "password": "lumalu",
     "database": "DonBest"
 };

sql.setDefaultConfig( config );


function getDateTime() {
    
        var date = new Date();
    
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
    
        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
    
        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
    
        var year = date.getFullYear();
    
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
    
        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
    
        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    
    }


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

    // http.createServer(function(req,res){
    //     var jsonFile=fs.readFile("thegreek.json", function(err,html){
    //                 res.writeHead(200,{"Content-Ype":"text/html"})
    //                 res.write(JSON.stringify({nombre:"Luis", username:"uriel"}));
    //                 res.end();
    //                 console.log("JSON File:" + jsonFile);
    //             });
    // }).listen(8080);

    var task = cron.schedule('*/5 * * * *', function(){
        console.log('running a task every 5 minutes. Actual time: ' + getDateTime());
        readNHLData('propositionsBaseball.html');
      });

      task.start();

function readNHLData(dirFile)
{
    fs.readFile(dirFile, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
    
        var dataHtml= (data);
        
         let $= cheerio.load(dataHtml);
    
         
         jsonframe($); // initializes the plugin
    
    
    let frame1={
        
    
    "PROPOSITIONS":
    {
    
    
        "All":"*",
                "Sub":"h1",
               
        
            
         
                "Games":{
                    "_s":".simpleContainer .simpleContainer",
                    "_d":[{
            
                        "MainMsg":"#MainMsg",
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
     
    var json2= JSON.parse(json);
    //console.log(json);
    
     
      var values= [];
      
            
         
        var numPlayers=0;
    
        
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
                                   
                                }
                                if (numPlayers==4)
                                {
                                   
                                    
                                      insertEventNHL(4,json2.PROPOSITIONS.Sub, eventId.slice(0,9), json2.PROPOSITIONS.Games[Game].Title, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].player,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[1].playerodds,'', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].player, '', json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[0].playerodds, '',  json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Title, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[2].playerodds, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].player, json2.PROPOSITIONS.Games[Game].Events[Events].Lines[Lines].Players[3].playerodds );
                                    console.log('Players:' + numPlayers);
                                  
                                }
    
                                numPlayers=0;
    
    
                    
                  }
    
               
             }
           
       }
    
        
        fs.writeFile('thegreek.json', JSON.stringify(json, null, 4), function(err) {
            console.log('Thegreek saved in theGreek.json file');
        });
    
        
       
    });
    
    
    
}







 