function theGreek()
{
    fs.readFile('propositionsBaseball.html', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
    
        var dataHtml= (data);
        
         let $= cheerio.load(dataHtml);
}