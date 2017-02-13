/**
 * This route defines the CRUD operations for a given route in the API.
 * Each entity you wish to interact with inside of Fountain should have a
 * corresponding route file structured like this.
 *
 */

let express = require('express');
let router = express.Router();
let dir = __dirname.split('/');
let name = dir.slice(-1).pop();


// Global actions for the this route
router.use(function(req, res, next) {
  next();
});


// Create Operations
router.post('/', function(req, res) {
  let id = 0;
  res.send(`Post route for ${name}: ${id}`);
  // Success: 201 (Created): Headers.Location: /${name}/${id}
  // Fail: 404 (Not Found), 409 (Conflict)
});


// Read Operations
router.get('/', function(req, res) {
  res.send(`Get route for ${name}`);
  // Success: 200 (OK)
  // Fail: 404 (Not Found)
});


// Update Operations
router.put('/:id', function(req, res) {
  let id = req.params.id;
  res.send(`Put route for ${name}: ${id}`);
  // Success: 200 (OK), 204 (No Content)
  // Fail: 404 (Not Found)
});


// Modify Operations
router.patch('/:id', function(req, res) {
  let id = req.params.id;
  res.send(`Patch route for ${name}: ${id}`);
  // Success: 200 (OK), 204 (No Content)
  // Fail: 404 (Not Found)
});


// Delete Operations
router.delete('/:id', function(req, res) {
  let id = req.params.id;
  res.send(`Delete route for ${name}: ${id}`);
  // Success: 200 (OK)
  // Fail: 404 (Not Found)
});


// Options Operations - required for CORS XHR requests
router.options('/', function(req, res) {
  res.sendStatus(200);
});


module.exports = router;
