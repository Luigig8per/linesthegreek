const Horseman = require('node-horseman');
const users = ['PhantomJS', 'nodejs'];

users.forEach((user) => {
    const horseman = new Horseman();
    horseman
        .open(`http://www.thegreek.com/sportsbook/bet/betting-odds/Baseball%20Propositions`)
       .frameCount()
        .frameNames()
        
        .switchToFrame('content-frame')
        .evaluate(function()
        {
            return {
                html : $('*').html('<strong>Testing</strong> some stuff out.')
            }
        })
        
       
        .close();
});