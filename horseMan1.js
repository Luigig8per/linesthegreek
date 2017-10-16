var Horseman = require('node-horseman');
var horseman = new Horseman();

horseman
  .open('http://www.thegreek.com/sportsbook/bet/betting-odds/Baseball%20Propositions')
  .switchToFrame('content-frame')
  .html()
  .then(function(numLinks){
	console.log("Number of links: " +numLinks);
	horseman.close();
  });