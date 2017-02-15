/**
 * This controller handles the interaction of the API route and the data model
 * for "website". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const website = require('../models').website;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return website
      .create({
        siteid: uuidV4(),
        name: req.body.name,
        copyrightholder: req.body.copyrightholder,
        copyrightyear: req.body.copyrightyear,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (website) => {
        res.status(200).send(website);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return website
      .findAll()
      .then( (website) => {
        res.status(200).send(website);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return website
      .findAll({
        where: {
          siteid: req.params.id
        }
      })
      .then( (website) => {
        res.status(200).send(website);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return website
      .update({
        name: req.body.name,
        copyrightholder: req.body.copyrightholder,
        copyrightyear: req.body.copyrightyear,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          siteid: req.params.id
        }
      })
      .then( (website) => {
        res.status(200).send(website);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'siteid'){
        payload[field] = req.body[field];
      }
    });

    return website
      .update(payload,
      {
        where: {
          siteid: req.params.id
        }
      })
      .then( (website) => {
        res.status(200).send(website);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return website
      .destroy({
        where: {
          siteid: req.params.id
        }
      })
      .then( (website) => {
        res.status(200).send(website);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
