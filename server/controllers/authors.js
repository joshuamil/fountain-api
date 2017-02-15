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
        deleted: 0
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
  },

  update(req, res) {
    return authors
      .update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        credentials: req.body.credentials,
        email: req.body.email,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        googleplus: req.body.googleplus,
        instagram: req.body.instagram,
        passcode: req.body.passcode
      },{
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
  },

  patch(req, res) {

    let payload = {};
    let keys = Object.keys(req.body);
    keys.forEach( (field) => {
      if(req.body[field] !== null){
        payload[field] = req.body[field];
      }
    });

    return authors
      .update(payload,
      {
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
  },

  delete(req, res) {
    return authors
      .destroy({
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
