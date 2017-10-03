app.get('/customers/:customerId/orders', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.input('CustomerId', req.params.customerId);
        request.execute('Sales.uspShowOrderDetails', function(err, recordsets, returnValue, affected) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordsets)); // Result in JSON format
        });
    });
})