let express = require('express');
let path = require('path');
let routes = require('./conf/routes.json');

let app = express();

// Define base API route handler
app.all('/api/:operation', function (req, res, next) {
  // Handle lookup of client, authentication token, rate limits, etc.
  console.log(`Invoking route: ${req.params.operation}`);
  next();
});

// Default route response
app.get('/', function (req, res) {
  res.send('Greetings');
});

// Enable static routes
app.use('/static', express.static(path.join(__dirname, 'public')));

// Load custom external routes
let routers = {};
routes.forEach((rte) => {
  routers[rte.name] = require(`./routes/${rte.name}/${rte.name}`);
  app.use(rte.path, routers[rte.name]);
});


// Initialize the server
app.listen(3000, function () {
  console.log('Running on port 3000');
});
