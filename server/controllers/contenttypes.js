/**
 * This controller handles the interaction of the API route and the data model
 * for "contenttypes". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const contenttypes = require('../models').contenttypes;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return contenttypes
      .create({
        contenttypeid: uuidV4(),
        contenttype: req.body.contenttype,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (contenttypes) => {
        res.status(200).send(contenttypes);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return contenttypes
      .findAll()
      .then( (contenttypes) => {
        res.status(200).send(contenttypes);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return contenttypes
      .findAll({
        where: {
          contenttypeid: req.params.id
        }
      })
      .then( (contenttypes) => {
        res.status(200).send(contenttypes);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return contenttypes
      .update({
        contenttype: req.body.contenttype,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          contenttypeid: req.params.id
        }
      })
      .then( (contenttypes) => {
        res.status(200).send(contenttypes);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'contenttypeid'){
        payload[field] = req.body[field];
      }
    });

    return contenttypes
      .update(payload,
      {
        where: {
          contenttypeid: req.params.id
        }
      })
      .then( (contenttypes) => {
        res.status(200).send(contenttypes);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return contenttypes
      .destroy({
        where: {
          contenttypeid: req.params.id
        }
      })
      .then( (contenttypes) => {
        res.status(200).send(contenttypes);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
