/**
 * This controller handles the interaction of the API route and the data model
 * for "versions". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const versions = require('../models').versions;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {
    return versions
      .create({
        configid: uuidV4(),
        versionfull: req.body.versionfull,
        versionmajor: req.body.versionmajor,
        versionminor: req.body.versionminor,
        versionrelease: req.body.versionrelease,
        versionpatch: req.body.versionpatch,
        versionname: req.body.versionname,
        description: req.body.description,
        releasenotes: req.body.releasenotes,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (versions) => {
        res.status(200).send(versions);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return versions
      .findAll()
      .then( (versions) => {
        res.status(200).send(versions);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return versions
      .findAll({
        where: {
          configid: req.params.id
        }
      })
      .then( (versions) => {
        res.status(200).send(versions);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  update(req, res) {
    return versions
      .update({
        versionfull: req.body.versionfull,
        versionmajor: req.body.versionmajor,
        versionminor: req.body.versionminor,
        versionrelease: req.body.versionrelease,
        versionpatch: req.body.versionpatch,
        versionname: req.body.versionname,
        description: req.body.description,
        releasenotes: req.body.releasenotes,
        deleted: req.body.deleted,
        updatedAt: moment().format()

      },{
        where: {
          configid: req.params.id
        }
      })
      .then( (versions) => {
        res.status(200).send(versions);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null && field !== 'configid'){
        payload[field] = req.body[field];
      }
    });

    return versions
      .update(payload,
      {
        where: {
          configid: req.params.id
        }
      })
      .then( (versions) => {
        res.status(200).send(versions);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  delete(req, res) {
    return versions
      .destroy({
        where: {
          configid: req.params.id
        }
      })
      .then( (versions) => {
        res.status(200).send(versions);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
