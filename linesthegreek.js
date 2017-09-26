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

          "id": "id",
            

          

        }
       
    }


    console.log( $('body').scrape(frame, { string: true } ))



    var frametest = {
        "companies": {           // setting the parent item as "companies"
            "selector": ".item",    // defines the elements to search for
            "data": [{              // "data": [{}] defines a list of items
                "name": ".header [itemprop=name]",          // inline selector defining "name" so "company"."name"
                "description": ".header [rel=description]", // inline selector defining "description" as "company"."description"
                "url": {                                    // defining "url" by an attribute with "attr" and "selector" in an object
                    "selector": ".header [itemprop=name]",      // is actually the same as the inline selector
                    "attr": "href"                              // the attribute name to retrieve
                },
                "contact": {                                // set up a parent "contact" element as "company"."contact"
                    "selector": ".contact",                 // defines the element to search for
                    "data": {                               // defines the data which "contact" will contain
                        "telephone": {                          // using "type" to use "telephone" parser to extract only the telephone
                            "selector": "[itemprop=telephone]",     // simple selector for "telephone"                
                            "type": "telephone"                     // using "telephone" plugin parser
                        },
                        "employee": {                           // setting a parent node "employee" as "company"."contact"."employee"
                            "name": "[itemprop=employeeName]",          // inline selector defining "name"
                            "jobTitle": "[itemprop=employeeJobTitle]",  // inline selector defining "jobtitle"
                            "email": {                          // using "type" to use "email" parser to extract only the email
                                "selector": "[itemprop=email]",     // simple selector for "email"
                                "type": "email"                     // using "email" plugin parser
                            }
                        }
                    }
                }
            }]
        }
    
    };
    


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
 