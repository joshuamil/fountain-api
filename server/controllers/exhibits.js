/**
 * This controller handles the interaction of the API route and the data model
 * for "exhibits". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const exhibits = require('../models').exhibits;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return exhibits
      .create({

        exhibitid: uuidV4(),
        lang: req.body.lang,
        title: req.body.title,
        description: req.body.description,
        datepublished: req.body.datepublished,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (exhibits) => {
        res.status(200).send(exhibits);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return exhibits
      .findAll()
      .then( (exhibits) => {
        res.status(200).send(exhibits);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return exhibits
      .findAll({
        where: {
          exhibitid: req.params.id
        }
      })
      .then( (exhibits) => {
        res.status(200).send(exhibits);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
