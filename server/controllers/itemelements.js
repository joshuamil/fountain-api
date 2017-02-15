/**
 * This controller handles the interaction of the API route and the data model
 * for "itemelements". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const itemelements = require('../models').itemelements;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return itemelements
      .create({
        itemid: uuidV4(),
        elementid: req.body.elementid,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (itemelements) => {
        res.status(200).send(itemelements);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return itemelements
      .findAll()
      .then( (itemelements) => {
        res.status(200).send(itemelements);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return itemelements
      .findAll({
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemelements) => {
        res.status(200).send(itemelements);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return itemelements
      .update({
        elementid: req.body.elementid,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemelements) => {
        res.status(200).send(itemelements);
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

    return itemelements
      .update(payload,
      {
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemelements) => {
        res.status(200).send(itemelements);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return itemelements
      .destroy({
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemelements) => {
        res.status(200).send(itemelements);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
