/**
 * This controller handles the interaction of the API route and the data model
 * for "language". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const language = require('../models').language;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return language
      .create({
        langid: uuidV4(),
        lang: req.body.lang,
        locale: req.body.locale,
        label: req.body.label,
        isdefault: req.body.isdefault,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (language) => {
        res.status(200).send(language);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return language
      .findAll()
      .then( (language) => {
        res.status(200).send(language);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return language
      .findAll({
        where: {
          langid: req.params.id
        }
      })
      .then( (language) => {
        res.status(200).send(language);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return language
      .update({
        lang: req.body.lang,
        locale: req.body.locale,
        label: req.body.label,
        isdefault: req.body.isdefault,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          langid: req.params.id
        }
      })
      .then( (language) => {
        res.status(200).send(language);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'langid'){
        payload[field] = req.body[field];
      }
    });

    return language
      .update(payload,
      {
        where: {
          langid: req.params.id
        }
      })
      .then( (language) => {
        res.status(200).send(language);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return language
      .destroy({
        where: {
          langid: req.params.id
        }
      })
      .then( (language) => {
        res.status(200).send(language);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
