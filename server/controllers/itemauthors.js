/**
 * This controller handles the interaction of the API route and the data model
 * for "itemauthors". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const itemauthors = require('../models').itemauthors;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return itemauthors
      .create({
        itemid: uuidV4(),
        authorid: req.body.authorid,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (itemauthors) => {
        res.status(200).send(itemauthors);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return itemauthors
      .findAll()
      .then( (itemauthors) => {
        res.status(200).send(itemauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return itemauthors
      .findAll({
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemauthors) => {
        res.status(200).send(itemauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return itemauthors
      .update({
        authorid: req.body.authorid,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemauthors) => {
        res.status(200).send(itemauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'itemid'){
        payload[field] = req.body[field];
      }
    });

    return itemauthors
      .update(payload,
      {
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemauthors) => {
        res.status(200).send(itemauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return itemauthors
      .destroy({
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemauthors) => {
        res.status(200).send(itemauthors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
