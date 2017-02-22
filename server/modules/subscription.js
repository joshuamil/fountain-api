const subscriptions = require('../../conf/subscriptions.json');
const url = require('url');

module.exports = function(options) {
  return function(req, res, next) {

    if (!req.query.subscription_key) {

      res
        .status(401)
        .send({'status': 'Subscription key is missing.'})
        .end();

    } else {

      // Validate key
      let isValidKey = subscriptions.filter((item) => {
        return item.key === req.query.subscription_key;
      });

      if (!isValidKey || isValidKey.length === 0) {

        // Reject - key is invalid
        res
          .status(401)
          .send({'status': 'Subscription key is invalid.'})
          .end();

      } else {

        // Validate route
        let r = url.parse(req.url).pathname;
        let route = r.split('/');
        let isValidRoute = 1;
        if (isValidKey[0].routes.length > 0) {
          isValidRoute = isValidKey[0].routes.indexOf(route[route.length-1]);
        }

        if (isValidRoute < 0) {

          // Reject - route is not allowed
          res
            .status(401)
            .send({'status': 'Route not allowed by subscription.'})
            .end();

        } else {

          next();

        }

      }

    }

  }
}
