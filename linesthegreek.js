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

     let frame = {
        "title": "h1", // this is an inline selector


        "Subtitle": "h3",


        "lines": {  
            "selector": ".lines",   

            
           

        }
       
    }


    console.log( $('body').scrape(frame, { string: true } ))

});


let $ = cheerio.load(`
	<body>
		<h1>I love jsonframe!</h1>
		<span itemprop="email"> Email: gabin@datascraper.pro  </span>
	<body>`)

    let jsonframe = require('jsonframe-cheerio')
    jsonframe($) // initializing the plugin
    
    let frame = {
        "title": "h1", // this is an inline selector
        "email": "span[itemprop=email] < email" // output an extracted email
    }
    
    console.log( $('body').scrape(frame, { string: true } ))
 