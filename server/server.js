//Imports express
const express = require('express');
//Renames express
const app = express();
//Imports body-parser
const bodyParser = require('body-parser');
//Assings port
const PORT = process.env.PORT || 5000;
//Imports the router
const toDoRouter = require('./routers/to_do.router')

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
app.use('/api/to-do', toDoRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
