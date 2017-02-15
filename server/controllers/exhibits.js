const exhibits = require('../models').exhibits;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return exhibits
      .create({

        exhibitid: uuidV4(),
        lang: req.body.lang,
        title: req.body.title,
        description: req.body.description,
        datepublished: req.body.datepublished,
        deleted: req.body.deleted

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
      .findAll()
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
  }

};
