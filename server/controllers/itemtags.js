/**
 * This controller handles the interaction of the API route and the data model
 * for "itemtags". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const itemtags = require('../models').itemtags;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return itemtags
      .create({
        itemid: uuidV4(),
        tagid: req.body.tagid,
        tagstrength: req.body.tagstrength,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (itemtags) => {
        res.status(200).send(itemtags);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return itemtags
      .findAll()
      .then( (itemtags) => {
        res.status(200).send(itemtags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return itemtags
      .findAll({
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemtags) => {
        res.status(200).send(itemtags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return itemtags
      .update({
        tagid: req.body.tagid,
        tagstrength: req.body.tagstrength,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemtags) => {
        res.status(200).send(itemtags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'itemid'){
        payload[field] = req.body[field];
      }
    });

    return itemtags
      .update(payload,
      {
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemtags) => {
        res.status(200).send(itemtags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return itemtags
      .destroy({
        where: {
          itemid: req.params.id
        }
      })
      .then( (itemtags) => {
        res.status(200).send(itemtags);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
