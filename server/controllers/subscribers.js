/**
 * This controller handles the interaction of the API route and the data model
 * for "subscribers". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const subscribers = require('../models').subscribers;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return subscribers
      .create({
        configid: uuidV4(),
        name: req.body.name,
        description: req.body.description,
        ratecalls: req.body.ratecalls,
        rateduration: req.body.rateduration,
        quotacalls: req.body.quotacalls,
        quotaduration: req.body.quotaduration,
        ipsallowed: req.body.ipsallowed,
        ipsdenied: req.body.ipsdenied,
        priority: req.body.priority,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (subscribers) => {
        res.status(200).send(subscribers);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return subscribers
      .findAll()
      .then( (subscribers) => {
        res.status(200).send(subscribers);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return subscribers
      .findAll({
        where: {
          configid: req.params.id
        }
      })
      .then( (subscribers) => {
        res.status(200).send(subscribers);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return subscribers
      .update({
        name: req.body.name,
        description: req.body.description,
        ratecalls: req.body.ratecalls,
        rateduration: req.body.rateduration,
        quotacalls: req.body.quotacalls,
        quotaduration: req.body.quotaduration,
        ipsallowed: req.body.ipsallowed,
        ipsdenied: req.body.ipsdenied,
        priority: req.body.priority,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          configid: req.params.id
        }
      })
      .then( (subscribers) => {
        res.status(200).send(subscribers);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'configid'){
        payload[field] = req.body[field];
      }
    });

    return subscribers
      .update(payload,
      {
        where: {
          configid: req.params.id
        }
      })
      .then( (subscribers) => {
        res.status(200).send(subscribers);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return subscribers
      .destroy({
        where: {
          configid: req.params.id
        }
      })
      .then( (subscribers) => {
        res.status(200).send(subscribers);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
