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

// Associated models
const itemelements = require('../models').itemelements;
const mediaelements = require('../models').mediaelements;
const exhibititems = require('../models').exhibititems;

items.hasMany(itemelements, { foreignKey: 'itemid' });
mediaelements.hasOne(itemelements, { foreignKey: 'elementid' });
items.hasOne(exhibititems, { foreignKey: 'itemid' });

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
      .findAll({
        include: [
          {
            model: itemelements,
            include: [
              {
                model: mediaelements
              }
            ]
          }
        ]
      })
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
  },

  update(req, res) {
    return items
      .update({
        lang: req.body.lang,
        title: req.body.title,
        subtitle: req.body.subtitle,
        shortdesc: req.body.shortdesc,
        longdesc: req.body.longdesc,
        datepublished: req.body.datepublished,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
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
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'itemid'){
        payload[field] = req.body[field];
      }
    });

    return items
      .update(payload,
      {
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
  },

  delete(req, res) {
    return items
      .destroy({
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
