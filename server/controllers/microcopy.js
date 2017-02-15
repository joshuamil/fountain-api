/**
 * This controller handles the interaction of the API route and the data model
 * for "microcopy". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const microcopy = require('../models').microcopy;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return microcopy
      .create({

        entryid: uuidV4(),
        lang: req.body.lang,
        key: req.body.key,
        value: req.body.value,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (microcopy) => {
        res.status(200).send(microcopy);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return microcopy
      .findAll()
      .then( (microcopy) => {
        res.status(200).send(microcopy);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return microcopy
      .findAll({
        where: {
          entryid: req.params.id
        }
      })
      .then( (microcopy) => {
        res.status(200).send(microcopy);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
