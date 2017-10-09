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
   "host": "10.10.10.46",
    "user": "sportbookdba",
    "password": "lumalu",
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
                val: away_money_ln
                
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
    

"LEAGUES":
{

  //  "Sport": ".simpleContainer",
    
            "Sub":".simpleContainer @ id",
    
            "Date" : "h2",

            "id":".lines  @ id",
     
          
    "Games":{
        "_s":".lines",
        "_d":[{

             "Title1": ".simpleContainer @ id",
             "Game":"h2",

            "Title": ".title",
             "Game":"h2",
              "player1":".has-lines .name",
              "player1odds":".has-lines .odd ",
            "id": ".lines @ id",
            
            "title":"h3 .orn",
            "hour":".notes-bar",
            
              "id":".row-home @ id",

              "home_team":".row-home .name",
              "home_spread":".row-home .spread",
              "home_money_line":".row-home .money-line",
              "home_pitcher":".row-home .pitcher",
              "home_total":".row-home .total",
               "home_team_total":".row-home .team-total",

               "player2":".row-away .name",
                "player2_odd":".row-away .odd",
              "away_spread":".row-away .spread",
              "away_money_line":".row-away .money-line",
              "away_pitcher":".row-away .pitcher",
              "away_total":".row-away .total",
            "away_team_total":".row-away .team-total",



        }]
    }

}
}




    
    
    var json=$('body').scrape(frame1, { string: true } );
    // console.log("SPORTBOOK: "  + json);
var json2= JSON.parse(json);
//console.log(json);

 //   var Leagues= json2.LEAGUES.Sport.Title;
  //WORKS: console.log(json2.LEAGUES.Games[1].Teams[1].Team);

//   console.log(json2.LEAGUES);
  var values= [];
    for( var Games in json2.LEAGUES.Games) {    
      //  console.log(json2.LEAGUES.Games[Games].player2_odd);
        var player2odd=json2.LEAGUES.Games[Games].player2_odd;
        console.log(player2odd)
    // console.log(json2.LEAGUES.Games[Games].Title);
    //  values.push([json2.LEAGUES.Games[Games].Title, json2.LEAGUES.Games[Games].hour] )
        //var query = "INSERT INTO [the_greek_game] (title, hour, teamhome, team_home_spread, team_away, team_away_total) VALUES (" + json2.LEAGUES.Games[Games].Title +"," + json2.LEAGUES.Games[Games].hour + "," + + "," +  + ", " + json2.LEAGUES.Games[Games].Teams[1].MoneyLn + ", " + json2.LEAGUES.Games[Games].Teams[1].Teamtotal + "," +  + " )";
      updateMember('',json2.LEAGUES.Games[Games].Title,json2.LEAGUES.Games[Games].hour, json2.LEAGUES.Games[Games].player1, '',  json2.LEAGUES.Games[Games].player1odds,' json2.LEAGUES.Games[Games].home_total', json2.LEAGUES.Games[Games].player2, 'json2.LEAGUES.Games[Games].away_spread',   player2odd, 'json2.LEAGUES.Games[Games].away_total');
   
      //  executeQuery (query);
     //  console.log(json2.LEAGUES.Games[Games]);
     //  executeQuery("INSERT INTO [the_greek_game] (title, hour) VALUES ('json2.LEAGUES.Games[Games].Title','json2.LEAGUES.Games[Games].hour]')");
       
        
    
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








 