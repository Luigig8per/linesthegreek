var sql = require("mssql");

var  executeQuery = function(query){             
    sql.connect(dbConfig, function (err) {
        if (err) {   
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                 }
                 else {
                        // create Request object
                        var request = new sql.Request();
                        // query to the database
                        request.query(query, function (err, res) {
                          if (err) {
                                     console.log("Error while querying database :- " + err);
                                   
                                    }
                                    else {
                                     sql.c
                                           }
                              });
                      }
     }); 
   
               
}