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
const itemelements = require('../controllers').itemelements;


// Global actions for the this route
router.use(function(req, res, next) {
  next();
});


// Create Operations
router.post('/', function(req, res) {
  let id = 0;
  return itemelements.create(req, res);
  // res.send(`Post route for ${name}: ${id}`);
});


// Read Operations
router.get('/', function(req, res) {
  return itemelements.list(req, res);
  // res.send(`Get route for ${name}`);
});

router.get('/:id', function(req, res) {
  let id = req.params.id;
  return itemelements.retrieve(req, res);
  // res.send(`Get route for ${name}: ${id}`);
});


// Update Operations
router.put('/:id', function(req, res) {
  let id = req.params.id;
  return itemelements.update(req, res);
  // res.send(`Put route for ${name}: ${id}`);
});


// Modify Operations
router.patch('/:id', function(req, res) {
  let id = req.params.id;
  return itemelements.patch(req, res);
  // res.send(`Patch route for ${name}: ${id}`);
});


// Delete Operations
router.delete('/:id', function(req, res) {
  let id = req.params.id;
  return itemelements.delete(req, res);
  // res.send(`Delete route for ${name}: ${id}`);
});


// Options Operations - required for CORS XHR requests
router.options('/', function(req, res) {
  res.sendStatus(200);
});


module.exports = router;
