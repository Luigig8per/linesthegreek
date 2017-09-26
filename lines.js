let cheerio = require('cheerio')
let jsonframe = require('jsonframe-cheerio');

var fs = require('fs');
var express = require('express');
var linesList = [];
var woola=[];

 fs.readFile('body.html', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }

        var dataHtml= (data);
        
         let $= cheerio.load(dataHtml);
 
         jsonframe($); // initializes the plugin


         var frame = {
          "lines": {           // setting the parent item as "companies"
            "selector": ".lines",    // defines the elements to search for
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
 // For each .item, we add all the structure of a company to the companiesList array
 // Don't try to understand what follows because we will do it differently.
 $('.lines').each(function(index, element){
    // console.log($element.text());
     linesList[index] = {};
     
      linesList[index]['teams'] = {};


     var header = $(element).find('.notes-bar')

     
     linesList[index]['hour']=$(element).children().first().text();

     linesList[index]['team']=$(element).find('[class="name"]').text();
   


    //Good one: Just need to create new entity and divide fields:
    linesList[index]['spread_home']=$(element).find('[id="spread_home"][class="spread"]').text();

     //Next one looks perfect
     linesList[index]['ml']=$(element).find('[id=ml]').text();

      //Working: Just need to include for each a hared or similar.
     linesList[index]['gt']=$(element).find('[id=gt],[class="total"]').text();
     linesList[index]['tt']=$(element).find('[id="tt"],[class="team-total"]').text();

     

     //Working: Just need to divide and see how to add anothers divisions
     linesList[index]['ml']=$(element).find('[id=ml]').text();

    
    
     console.log( linesList[index]['team']);


     //linesList[index]['nam']=$(element).find('[class=name]').text();

 var header3=  $(element).find('[id=spread_home]')
 linesList[index]['spread_home']={};
 linesList[index]['spread_home']['odd']= $(header).find('[class=odd]').text();
 });
 
 
 //console.log(linesList);

 


 

    });
     //   console.log(data);
  

