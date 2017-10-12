var phantom = require("phantom");
var _ph, _page, _outObj;

phantom.create().then(function(ph){
    _ph = ph;
    return _ph.createPage();
}).then(function(page){
    _page = page;
    return _page.open('http://thegreek.com/sportsbook/bet/betting-odds/Baseball%20Propositions');
}).then(function(status){
    console.log(status);
    return _page.property('content')
}).then(function(content){
    console.log(content);
    _page.close();
   
}).catch(function(e){
   console.log(e); 
});
 
