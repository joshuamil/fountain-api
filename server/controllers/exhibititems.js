/**
 * This controller handles the interaction of the API route and the data model
 * for "exhibititems". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const exhibititems = require('../models').exhibititems;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return exhibititems
      .create({
        exhibitid: uuidV4(),
        itemid: req.body.itemid,
        sortorder: req.body.sortorder,
        islead: req.body.islead,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (exhibititems) => {
        res.status(200).send(exhibititems);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return exhibititems
      .findAll()
      .then( (exhibititems) => {
        res.status(200).send(exhibititems);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return exhibititems
      .findAll({
        where: {
          exhibitid: req.params.id
        }
      })
      .then( (exhibititems) => {
        res.status(200).send(exhibititems);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return exhibititems
      .update({
        itemid: req.body.itemid,
        sortorder: req.body.sortorder,
        islead: req.body.islead,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          exhibitid: req.params.id
        }
      })
      .then( (exhibititems) => {
        res.status(200).send(exhibititems);
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

    return exhibititems
      .update(payload,
      {
        where: {
          exhibitid: req.params.id
        }
      })
      .then( (exhibititems) => {
        res.status(200).send(exhibititems);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return exhibititems
      .destroy({
        where: {
          exhibitid: req.params.id
        }
      })
      .then( (exhibititems) => {
        res.status(200).send(exhibititems);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
