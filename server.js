const express = require('express')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3003;

// Configure the app (app.set)
const fs = require('fs') // this engine requires the fs module like we did Saturday
app.engine('hypatia', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine

// greetings route
app.get('/greetings/', (req, res) => {
    res.send('greetings');
});

//
app.get('/greetings/:name', (req, res) => {
    res.send("what's up, " + req.params.name);
});

// app.get('/tip/:total', (req, res) => {
//     res.send('Total is $' + req.params.total);
// });

// app.get('/tip/:total/:percentage', (req, res) => {
//     res.render('form', { title: 'TipPercent', message: 'The total is $ ' + req.params.total + ', and your tabulated tip is $ ' + req.params.percentage + ''});
//   });



// Tell the app to listen on port 3000
app.listen(3000, function() {
 console.log('Listening on port 3000');
});