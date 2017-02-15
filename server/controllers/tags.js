/**
 * This controller handles the interaction of the API route and the data model
 * for "tags". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const tags = require('../models').tags;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return tags
      .create({
        tagid: uuidV4(),
        tag: req.body.tag,
        lang: req.body.lang,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (tags) => {
        res.status(200).send(tags);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return tags
      .findAll()
      .then( (tags) => {
        res.status(200).send(tags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return tags
      .findAll({
        where: {
          tagid: req.params.id
        }
      })
      .then( (tags) => {
        res.status(200).send(tags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return tags
      .update({
        tag: req.body.tag,
        lang: req.body.lang,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          tagid: req.params.id
        }
      })
      .then( (tags) => {
        res.status(200).send(tags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'tagid'){
        payload[field] = req.body[field];
      }
    });

    return tags
      .update(payload,
      {
        where: {
          tagid: req.params.id
        }
      })
      .then( (tags) => {
        res.status(200).send(tags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return tags
      .destroy({
        where: {
          tagid: req.params.id
        }
      })
      .then( (tags) => {
        res.status(200).send(tags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
