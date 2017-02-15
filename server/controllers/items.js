/**
 * This controller handles the interaction of the API route and the data model
 * for "items". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const items = require('../models').items;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return items
      .create({

        itemid: uuidV4(),
        lang: req.body.lang,
        title: req.body.title,
        subtitle: req.body.subtitle,
        shortdesc: req.body.shortdesc,
        longdesc: req.body.longdesc,
        datepublished: req.body.datepublished,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (items) => {
        res.status(200).send(items);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return items
      .findAll()
      .then( (items) => {
        res.status(200).send(items);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return items
      .findAll({
        where: {
          itemid: req.params.id
        }
      })
      .then( (items) => {
        res.status(200).send(items);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
