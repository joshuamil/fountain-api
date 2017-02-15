const website = require('../models').website;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return website
      .create({

        siteid: uuidV4(),
        name: req.body.name,
        datecreated: req.body.datecreated,
        copyrightholder: req.body.copyrightholder,
        copyrightyear: req.body.copyrightyear,
        deleted: req.body.deleted

      })
      .then( (website) => {
        res.status(200).send(website);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return website
      .findAll()
      .then( (website) => {
        res.status(200).send(website);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return website
      .findAll({
        where: {
          siteid: req.params.id
        }
      })
      .then( (website) => {
        res.status(200).send(website);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
