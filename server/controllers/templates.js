/**
 * This controller handles the interaction of the API route and the data model
 * for "templates". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const templates = require('../models').templates;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return templates
      .create({

        templateid: uuidV4(),
        siteid: req.body.siteid,
        name: req.body.name,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (templates) => {
        res.status(200).send(templates);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return templates
      .findAll()
      .then( (templates) => {
        res.status(200).send(templates);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return templates
      .findAll({
        where: {
          templateid: req.params.id
        }
      })
      .then( (templates) => {
        res.status(200).send(templates);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
