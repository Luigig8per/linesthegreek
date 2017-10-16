var phantom = require("phantom");
var _ph, _page, _outObj;

phantom.create().then(function(ph){
    _ph = ph;
    return _ph.createPage();
}).then(function(page){
    _page = page;
   
  
     _page.open('http://thegreek.com/sportsbook/bet/betting-odds/Baseball%20Propositions');
     return _page.switchToFrame('content-frame').then(function() {
        // now the context of `page` will be the iframe if frame name or position exists 
    });
}).then(function(status){
    console.log(status);
   
}).then(function(content){

    

    console.log(content);
    _page.close();
   
}).catch(function(e){
   console.log(e); 
});
 
