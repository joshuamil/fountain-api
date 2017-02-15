/**
 * This controller handles the interaction of the API route and the data model
 * for "mediatypes". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const mediatypes = require('../models').mediatypes;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return mediatypes
      .create({

        mediatypeid: uuidV4(),
        mediatype: req.body.mediatype,
        mimetype: req.body.mimetype,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (mediatypes) => {
        res.status(200).send(mediatypes);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return mediatypes
      .findAll()
      .then( (mediatypes) => {
        res.status(200).send(mediatypes);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return mediatypes
      .findAll({
        where: {
          mediatypeid: req.params.id
        }
      })
      .then( (mediatypes) => {
        res.status(200).send(mediatypes);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
