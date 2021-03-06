/**
 * This controller handles the interaction of the API route and the data model
 * for "websitetags". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const websitetags = require('../models').websitetags;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return websitetags
      .create({
        siteid: req.body.siteid,
        tagid: req.body.tagid,
        tagstrength: req.body.tagstrength,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (websitetags) => {
        res.status(200).send(websitetags);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return websitetags
      .findAll()
      .then( (websitetags) => {
        res.status(200).send(websitetags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return websitetags
      .findAll({
        where: {
          websitetagsid: req.params.id
        }
      })
      .then( (websitetags) => {
        res.status(200).send(websitetags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return websitetags
      .update({
        siteid: req.body.siteid,
        tagid: req.body.tagid,
        tagstrength: req.body.tagstrength,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          websitetagsid: req.params.id
        }
      })
      .then( (websitetags) => {
        res.status(200).send(websitetags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'websitetagsid'){
        payload[field] = req.body[field];
      }
    });

    return websitetags
      .update(payload,
      {
        where: {
          websitetagsid: req.params.id
        }
      })
      .then( (websitetags) => {
        res.status(200).send(websitetags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return websitetags
      .destroy({
        where: {
          websitetagsid: req.params.id
        }
      })
      .then( (websitetags) => {
        res.status(200).send(websitetags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
