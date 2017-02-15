const [MODEL] = require('../models').[MODEL];
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return [MODEL]
      .create({

        [COLUMNS]
      })
      .then( ([MODEL]) => {
        res.status(200).send([MODEL]);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return [MODEL]
      .findAll()
      .then( ([MODEL]) => {
        res.status(200).send([MODEL]);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return [MODEL]
      .findAll({
        where: {
          [KEYNAME]: req.params.id
        }
      })
      .then( ([MODEL]) => {
        res.status(200).send([MODEL]);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
