/**
 * This controller handles the interaction of the API route and the data model
 * for "publishing". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const publishing = require('../models').publishing;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return publishing
      .create({

        configid: uuidV4(),
        siteid: req.body.siteid,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        schedulecron: req.body.schedulecron,
        targets: req.body.targets,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (publishing) => {
        res.status(200).send(publishing);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return publishing
      .findAll()
      .then( (publishing) => {
        res.status(200).send(publishing);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return publishing
      .findAll({
        where: {
          configid: req.params.id
        }
      })
      .then( (publishing) => {
        res.status(200).send(publishing);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
