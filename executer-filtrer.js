app.get('/customers/:customerId/', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        var stringRequest = 'select * from Sales.Customer where customerId = ' + req.params.customerId;
        request.query(stringRequest, function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
})