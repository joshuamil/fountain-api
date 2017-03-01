/**
 * This controller handles the interaction of the API route and the data model
 * for "mediaelements". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const mediaelements = require('../models').mediaelements;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

// Associated models
const itemelements = require('../models').itemelements;
mediaelements.hasOne(itemelements, { foreignKey: 'elementid' });

module.exports = {

  create(req, res) {
    return mediaelements
      .create({
        elementid: uuidV4(),
        mediatypeid: req.body.mediatypeid,
        lang: req.body.lang,
        mediasource: req.body.mediasource,
        title: req.body.title,
        caption: req.body.caption,
        alttext: req.body.alttext,
        credit: req.body.credit,
        datasources: req.body.datasources,
        datepublished: req.body.datepublished,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (mediaelements) => {
        res.status(200).send(mediaelements);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return mediaelements
      .findAll({
        include: [
          {
            model: itemelements
          }
        ]
      })
      .then( (mediaelements) => {
        res.status(200).send(mediaelements);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return mediaelements
      .findAll({
        where: {
          elementid: req.params.id
        }
      })
      .then( (mediaelements) => {
        res.status(200).send(mediaelements);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return mediaelements
      .update({
        mediatypeid: req.body.mediatypeid,
        lang: req.body.lang,
        mediasource: req.body.mediasource,
        title: req.body.title,
        caption: req.body.caption,
        alttext: req.body.alttext,
        credit: req.body.credit,
        datasources: req.body.datasources,
        datepublished: req.body.datepublished,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          elementid: req.params.id
        }
      })
      .then( (mediaelements) => {
        res.status(200).send(mediaelements);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'elementid'){
        payload[field] = req.body[field];
      }
    });

    return mediaelements
      .update(payload,
      {
        where: {
          elementid: req.params.id
        }
      })
      .then( (mediaelements) => {
        res.status(200).send(mediaelements);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return mediaelements
      .destroy({
        where: {
          elementid: req.params.id
        }
      })
      .then( (mediaelements) => {
        res.status(200).send(mediaelements);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
