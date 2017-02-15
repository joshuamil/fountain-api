/**
 * This route defines the CRUD operations for a given route in the API.
 * Each entity you wish to interact with inside of Fountain should have a
 * corresponding route file structured like this.
 *
 */

'use strict';

const express = require('express');
const router = express.Router();
const dir = __dirname.split('/');
const name = dir.slice(-1).pop();
const exhibits = require('../controllers').exhibits;


// Global actions for the this route
router.use(function(req, res, next) {
  next();
});


// Create Operations
router.post('/', function(req, res) {
  let id = 0;
  return exhibits.create(req, res);
});


// Read Operations
router.get('/', function(req, res) {
  return exhibits.list(req, res);
});

router.get('/:id', function(req, res) {
  let id = req.params.id;
  return exhibits.retrieve(req, res);
});


// Update Operations
router.put('/:id', function(req, res) {
  let id = req.params.id;
  return exhibits.update(req, res);
});


// Modify Operations
router.patch('/:id', function(req, res) {
  let id = req.params.id;
  return exhibits.patch(req, res);
});


// Delete Operations
router.delete('/:id', function(req, res) {
  let id = req.params.id;
  return exhibits.delete(req, res);
});


// Options Operations - required for CORS XHR requests
router.options('/', function(req, res) {
  res.sendStatus(200);
});


module.exports = router;
