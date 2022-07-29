const express = require('express')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3003;

// Configure the app (app.set)
const fs = require('fs') // this engine requires the fs module 
app.engine('hypatia', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    //simple view engine from hypatia sheet
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine

// route
app.get('/home', (req, res) => {
    res.render('beer', { title: 'Pass the beer around', message: '99 bottles of beer on the wall'});
  });

  app.get("/:numberOfBottles?", function( req, res ){
    var bottles = parseInt(req.params.numberOfBottles) || 99
    var next = bottles - 1
    res.send(`<div> ${next}
    <head>
    Take One Down, Pass it Around
    </head>
    <body>
    <header> ${bottles} +  bottles of beer on the wall</header>
    <a href='/${next}'>Take One Down, Pass it Around</a>
    </body> 
    </div>`)
  })
  
  
// Tell the app to listen on port 3000
app.listen(port, function() {
    console.log('Listening on port', port);
   });