/**
 * This controller handles the interaction of the API route and the data model
 * for "[MODEL]". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const [MODEL] = require('../models').[MODEL];
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return [MODEL]
      .create({
        [COLUMNS]
      })
      .then( ([MODEL]) => {
        res.status(200).send([MODEL]);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return [MODEL]
      .findAll()
      .then( ([MODEL]) => {
        res.status(200).send([MODEL]);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return [MODEL]
      .findAll({
        where: {
          [KEYNAME]: req.params.id
        }
      })
      .then( ([MODEL]) => {
        res.status(200).send([MODEL]);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return [MODEL]
      .update({
        [COLUMNS-UPDATE]
      },{
        where: {
          [KEYNAME]: req.params.id
        }
      })
      .then( ([MODEL]) => {
        res.status(200).send([MODEL]);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== '[KEYNAME]'){
        payload[field] = req.body[field];
      }
    });

    return [MODEL]
      .update(payload,
      {
        where: {
          [KEYNAME]: req.params.id
        }
      })
      .then( ([MODEL]) => {
        res.status(200).send([MODEL]);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return [MODEL]
      .destroy({
        where: {
          [KEYNAME]: req.params.id
        }
      })
      .then( ([MODEL]) => {
        res.status(200).send([MODEL]);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
