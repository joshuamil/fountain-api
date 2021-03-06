/**
 * This controller handles the interaction of the API route and the data model
 * for "exhibitauthors". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const exhibitauthors = require('../models').exhibitauthors;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return exhibitauthors
      .create({
        exhibitid: uuidV4(),
        authorid: req.body.authorid,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (exhibitauthors) => {
        res.status(200).send(exhibitauthors);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return exhibitauthors
      .findAll()
      .then( (exhibitauthors) => {
        res.status(200).send(exhibitauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return exhibitauthors
      .findAll({
        where: {
          exhibitid: req.params.id
        }
      })
      .then( (exhibitauthors) => {
        res.status(200).send(exhibitauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return exhibitauthors
      .update({
        authorid: req.body.authorid,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          exhibitid: req.params.id
        }
      })
      .then( (exhibitauthors) => {
        res.status(200).send(exhibitauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'exhibitid'){
        payload[field] = req.body[field];
      }
    });

    return exhibitauthors
      .update(payload,
      {
        where: {
          exhibitid: req.params.id
        }
      })
      .then( (exhibitauthors) => {
        res.status(200).send(exhibitauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return exhibitauthors
      .destroy({
        where: {
          exhibitid: req.params.id
        }
      })
      .then( (exhibitauthors) => {
        res.status(200).send(exhibitauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
