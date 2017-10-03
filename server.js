var express = require('express');
var app = express();

var config = {
    user: 'sportbookdba',
    password: 'lumalu',
    server: '10.10.10.46', 
    database: 'DonBest' 
};

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    sql.connect(config, function (err) {
    
        if (err) console.log(err);
       
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from league', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

app.post('/', function (req, res) {
    
     var sql = require("mssql");
 
     sql.connect(config, function (err) {
     
         if (err) console.log(err);
        
         // create Request object
         var request = new sql.Request();
            
         // query to the database and get the records
         request.query("INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password", function (err, recordset) {
             
             if (err) console.log(err)
 
             // send records as a response
             res.send(recordset);
             
         });
     });
 });

var server = app.listen(5000, function () {
    console.log('Server is running..');
});