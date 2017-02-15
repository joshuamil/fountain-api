/**
 * This controller handles the interaction of the API route and the data model
 * for "websitemetadata". Actions here meant to be handled directly by RESTful requests
 * that initiate via the associated route. Each REST verb should have a related
 * action in this file (e.g.: GET = list / retrieve, POST = create, PUT = update,
 * PATCH = modify, etc.)
 *
 */

'use strict';

const websitemetadata = require('../models').websitemetadata;
const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports = {

  create(req, res) {

    return websitemetadata
      .create({

        metaid: uuidV4(),
        siteid: req.body.siteid,
        lang: req.body.lang,
        title: req.body.title,
        shortdesc: req.body.shortdesc,
        longdesc: req.body.longdesc,
        type: req.body.type,
        url: req.body.url,
        image: req.body.image,
        fb_appid: req.body.fb_appid,
        fb_adminid: req.body.fb_adminid,
        tw_id: req.body.tw_id,
        tw_name: req.body.tw_name,
        gplus_id: req.body.gplus_id,
        favicon: req.body.favicon,
        mobile_icon_57: req.body.mobile_icon_57,
        mobile_icon_72: req.body.mobile_icon_72,
        mobile_icon_76: req.body.mobile_icon_76,
        mobile_icon_114: req.body.mobile_icon_114,
        mobile_icon_120: req.body.mobile_icon_120,
        mobile_icon_144: req.body.mobile_icon_144,
        mobile_icon_152: req.body.mobile_icon_152,
        mobile_icon_180: req.body.mobile_icon_180,
        privacypolicy: req.body.privacypolicy,
        termsofuse: req.body.termsofuse,
        deleted: req.body.deleted,
        createdAt: moment().format(),
        updatedAt: moment().format()

      })
      .then( (websitemetadata) => {
        res.status(200).send(websitemetadata);
      })
      .catch( (error) => {
        res.status(400).send(error);
      })
  },

  list(req, res) {
    return websitemetadata
      .findAll()
      .then( (websitemetadata) => {
        res.status(200).send(websitemetadata);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  },

  retrieve(req, res) {
    return websitemetadata
      .findAll({
        where: {
          metaid: req.params.id
        }
      })
      .then( (websitemetadata) => {
        res.status(200).send(websitemetadata);
      })
      .catch( (error) => {
        res.status(404).send(error);
      });
  }

};
