// Get application settings
const routes = require('../../conf/routes.json');

let controllers = {};

routes.forEach((rte) => {
  try {
    controllers[rte.name] = require(`./${rte.name}`);
    module.exports[rte.name] = controllers[rte.name];
  } catch (e) {
    console.error(e);
  }
});
