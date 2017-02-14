const authors = require('../models').authors;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return authors
      .create({
        authorid: uuidV4(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        credentials: req.body.credentials,
        email: req.body.email,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        googleplus: req.body.googleplus,
        instagram: req.body.instagram,
        passcode: req.body.passcode,
        createdAt: moment().format(),
        updatedAt: moment().format(),
        deleted: req.body.deleted
      })
      .then( (authors) => {
        res.status(200).send(authors);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return authors
      .findAll({
        attributes: {
          exclude: ['passcode']
        }
      })
      .then( (authors) => {
        res.status(200).send(authors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return authors
      .findAll({
        attributes: {
          exclude: ['passcode']
        },
        where: {
          authorid: req.params.id
        }
      })
      .then( (authors) => {
        res.status(200).send(authors);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
