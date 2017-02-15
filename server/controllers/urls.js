/**
 * This controller handles the interaction of the API route and the data model
 * for "urls". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const urls = require('../models').urls;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return urls
      .create({

        urlid: uuidV4(),
        exhibitid: req.body.exhibitid,
        url: req.body.url,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (urls) => {
        res.status(200).send(urls);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return urls
      .findAll()
      .then( (urls) => {
        res.status(200).send(urls);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return urls
      .findAll({
        where: {
          urlid: req.params.id
        }
      })
      .then( (urls) => {
        res.status(200).send(urls);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
