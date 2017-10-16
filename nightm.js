var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
var nightmare = Nightmare();
nightmare.goto('http://example.com')
  .enterIFrame('#someIFrame')
  .title()
  .then(function(title){
    // `title` is the title of the child frame #someIFrame 
  })