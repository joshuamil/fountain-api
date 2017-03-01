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

const exhibititems = require('../models').exhibititems;
const items = require('../models').items;

exhibits.hasMany(exhibititems, { foreignKey: 'exhibitid' });
items.hasOne(exhibititems, { foreignKey: 'itemid' });

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
      .findAll({
        include: [
          {
            model: exhibititems,
            include: [
              {
                model: items
              }
            ]
          }
        ]
      })
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
  },

  update(req, res) {
    return exhibits
      .update({
        lang: req.body.lang,
        title: req.body.title,
        description: req.body.description,
        datepublished: req.body.datepublished,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
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
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'exhibitid'){
        payload[field] = req.body[field];
      }
    });

    return exhibits
      .update(payload,
      {
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
  },

  delete(req, res) {
    return exhibits
      .destroy({
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
