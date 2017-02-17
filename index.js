const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// Get application settings
const settings = require('./conf/app.json');

// Define custom routes
const routes = require('./conf/routes.json');

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Define base API route handler
app.all(`${settings.server.basePath}/:operation`, function (req, res, next) {
  // Handle lookup of client, authentication token, rate limits, etc.
  console.log(`Invoking route: ${req.params.operation}`);
  next();
});

// Default route response
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Enable static routes
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/swagger', express.static(path.join(__dirname, 'server/configs')));

// Load custom external routes
let routers = {};
routes.forEach((rte) => {
  try {
    routers[rte.name] = require(`./server/routes/${rte.name}`);
    app.use(`${settings.server.basePath}${rte.path}`, routers[rte.name]);
    console.log(`Route enabled: ${rte.name}`);
  } catch (e) {
    console.log(`Route missing: ${rte.name}`);
    console.log(e);
  }
});

// Initialize the server
app.listen(settings.server.port, function () {
  console.log(`Running on port: ${settings.server.port}`);
});
