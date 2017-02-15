/**
 * This controller handles the interaction of the API route and the data model
 * for "itemviews". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const itemviews = require('../models').itemviews;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return itemviews
      .create({

        viewid: uuidV4(),
        itemid: req.body.itemid,
        referreditemid: req.body.referreditemid,
        remote_addr: req.body.remote_addr,
        dateviewed: req.body.dateviewed,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (itemviews) => {
        res.status(200).send(itemviews);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return itemviews
      .findAll()
      .then( (itemviews) => {
        res.status(200).send(itemviews);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return itemviews
      .findAll({
        where: {
          viewid: req.params.id
        }
      })
      .then( (itemviews) => {
        res.status(200).send(itemviews);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
